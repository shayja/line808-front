package airtable

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"backend/internal/domain"
)

// AirtableLeadRepository implements the LeadRepository interface for Airtable
type AirtableLeadRepository struct {
	baseID    string
	tableName string
	token     string
	client    *http.Client
}

// Config holds configuration for Airtable repository
type Config struct {
	BaseID    string
	TableName string
	Token     string
}

// NewAirtableLeadRepository creates a new Airtable lead repository
func NewAirtableLeadRepository(cfg Config) (domain.LeadRepository, error) {
	if cfg.BaseID == "" || cfg.TableName == "" || cfg.Token == "" {
		return nil, fmt.Errorf("missing airtable configuration")
	}

	return &AirtableLeadRepository{
		baseID:    cfg.BaseID,
		tableName: cfg.TableName,
		token:     cfg.Token,
		client:    &http.Client{Timeout: 30 * time.Second},
	}, nil
}

// CreateLead now implements the context-aware interface
func (r *AirtableLeadRepository) CreateLead(ctx context.Context, lead domain.Lead) error {
	// Build Airtable payload
	fields := map[string]interface{}{
		"Name":    lead.Name,
		"Email":   lead.Email,
		"Message": lead.Message,
	}
	if lead.Source != "" {
		fields["Source"] = lead.Source
	}

	payload := map[string]interface{}{
		"records": []map[string]interface{}{
			{"fields": fields},
		},
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal payload: %w", err)
	}

	// Airtable API URL
	url := fmt.Sprintf("https://api.airtable.com/v0/%s/%s", r.baseID, r.tableName)

	// Use NewRequestWithContext to bind the outbound call to the request lifecycle
	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+r.token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := r.client.Do(req)
	if err != nil {
		return fmt.Errorf("airtable call failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("airtable error: status %d, body %s", resp.StatusCode, string(respBody))
	}

	return nil
}