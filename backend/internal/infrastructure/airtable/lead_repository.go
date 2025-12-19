package airtable

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"backend/internal/domain"
)

type airtableLeadRepository struct {
	baseID    string
	tableName string
	token     string
}

func NewAirtableLeadRepository() domain.LeadRepository {
	return &airtableLeadRepository{
		baseID:    os.Getenv("AIRTABLE_BASE_ID"),
		tableName: os.Getenv("AIRTABLE_TABLE_NAME"),
		token:     os.Getenv("AIRTABLE_TOKEN"),
	}
}

func (r *airtableLeadRepository) CreateLead(lead domain.Lead) error {
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

	req, err := http.NewRequest("POST", url, bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+r.token)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to call Airtable API: %w", err)
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	if resp.StatusCode >= 300 {
		log.Printf("Airtable error status: %d, body: %s", resp.StatusCode, string(respBody))
		return fmt.Errorf("airtable API error: status %d", resp.StatusCode)
	}

	return nil
}
