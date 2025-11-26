// file: internal/infrastructure/http/handlers/leads.go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

type LeadRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
	Source  string `json:"source,omitempty"`
	HP      string `json:"hp,omitempty"` // honeypot
}

type AirtableRecord struct {
	Fields map[string]interface{} `json:"fields"`
}

type AirtableCreatePayload struct {
	Records []AirtableRecord `json:"records"`
}

func createLeadHandler(c *gin.Context) {
	var req LeadRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON"})
		return
	}

	// Honeypot (bot protection)
	if req.HP != "" {
		c.Status(http.StatusNoContent)
		return
	}

	// Basic validation
	if strings.TrimSpace(req.Name) == "" ||
		strings.TrimSpace(req.Email) == "" ||
		strings.TrimSpace(req.Message) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing required fields"})
		return
	}

	// Build Airtable payload
	fields := map[string]interface{}{
		"Name":    req.Name,
		"Email":   req.Email,
		"Message": req.Message,
	}

	if strings.TrimSpace(req.Source) != "" {
		fields["Source"] = req.Source
	}

	payload := AirtableCreatePayload{
		Records: []AirtableRecord{
			{Fields: fields},
		},
	}

	body, _ := json.Marshal(payload)

	// Environment values
	baseID := os.Getenv("AIRTABLE_BASE_ID")
	tableName := os.Getenv("AIRTABLE_TABLE_NAME")
	token := os.Getenv("AIRTABLE_TOKEN")

	if baseID == "" || tableName == "" || token == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "missing Airtable environment vars"})
		return
	}

	// Airtable API URL
    //
	url := fmt.Sprintf("https://api.airtable.com/v0/%s/%s", baseID, tableName)
    log.Println(token)
	reqApi, _ := http.NewRequest("POST", url, bytes.NewReader(body))
	reqApi.Header.Set("Authorization", "Bearer "+token)
	reqApi.Header.Set("Content-Type", "application/json")

    resp, err := http.DefaultClient.Do(reqApi)
    if err != nil {
        c.JSON(http.StatusBadGateway, gin.H{"error": "failed to call Airtable"})
        return
    }
    defer resp.Body.Close()

    // Read body for debugging
    respBody, _ := io.ReadAll(resp.Body)

    if resp.StatusCode >= 300 {
        // TEMP: print error to console
        fmt.Println("Airtable error status:", resp.StatusCode)
        fmt.Println("Airtable error body:", string(respBody))

        c.JSON(http.StatusBadGateway, gin.H{
            "error":       "failed to save to Airtable",
            "status_code": resp.StatusCode,
            // optional: return message too while debugging
            "airtable": string(respBody),
        })
        return
    }


	c.JSON(http.StatusCreated, gin.H{"status": "ok"})
}
