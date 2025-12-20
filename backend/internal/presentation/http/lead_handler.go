// Package http contains HTTP handlers for the presentation layer
package http

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"backend/internal/application"
)

// LeadHandler handles HTTP requests related to leads
type LeadHandler struct {
	leadService *application.LeadService
}

// NewLeadHandler creates a new LeadHandler instance
func NewLeadHandler(leadService *application.LeadService) *LeadHandler {
	return &LeadHandler{
		leadService: leadService,
	}
}

// CreateLead handles POST requests to create a new lead
// @Summary Create a new lead
// @Description Create a new lead with contact information
// @Accept json
// @Produce json
// @Param lead body LeadHandler.CreateLead.Request true "Lead information"
// @Success 201 {object} Response "Lead created successfully"
// @Failure 400 {object} ErrorResponse "Invalid request"
// @Failure 502 {object} ErrorResponse "Failed to create lead"
// @Router /api/v1/leads [post]
func (h *LeadHandler) CreateLead(c *gin.Context) {
	var req struct {
		Name    string `json:"name"`      // Name of the lead
		Email   string `json:"email"`     // Email address of the lead
		Message string `json:"message"`   // Message from the lead
		Source  string `json:"source,omitempty"` // Source of the lead (optional)
		HP      string `json:"hp,omitempty"` // Honeypot field for bot protection
	}

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

	// Call application service
	err := h.leadService.CreateLead(req.Name, req.Email, req.Message, req.Source)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "failed to create lead"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"status": "ok"})
}
