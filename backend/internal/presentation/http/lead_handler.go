// Package http contains HTTP handlers for the presentation layer
package http

import (
	"net/http"

	"backend/internal/application"
	"backend/internal/domain"

	"github.com/gin-gonic/gin"
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
    var req CreateLeadRequest

    // Gin handles validation automatically via tags
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request data"})
        return
    }

    if req.HP != "" {
        c.Status(http.StatusNoContent)
        return
    }

    // 1. Map DTO to Domain Entity
    newLead := domain.Lead{
        Name:    req.Name,
        Email:   req.Email,
        Message: req.Message,
        Source:  req.Source,
    }

    // 2. Pass the Context and the Entity
    err := h.leadService.CreateLead(c.Request.Context(), newLead)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "service unavailable"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"status": "ok"})
}