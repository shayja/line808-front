package http

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"backend/internal/application"
)

type LeadHandler struct {
	leadService *application.LeadService
}

func NewLeadHandler(leadService *application.LeadService) *LeadHandler {
	return &LeadHandler{
		leadService: leadService,
	}
}

func (h *LeadHandler) CreateLead(c *gin.Context) {
	var req struct {
		Name    string `json:"name"`
		Email   string `json:"email"`
		Message string `json:"message"`
		Source  string `json:"source,omitempty"`
		HP      string `json:"hp,omitempty"` // honeypot
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
