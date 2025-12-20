// Package http contains HTTP handlers for the presentation layer
package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"backend/internal/application"
)

// MixHandler handles HTTP requests related to mixes
type MixHandler struct {
	mixService *application.MixService
}

// NewMixHandler creates a new MixHandler instance
func NewMixHandler(mixService *application.MixService) *MixHandler {
	return &MixHandler{
		mixService: mixService,
	}
}

// GetAllMixes handles GET requests to retrieve all mixes
// @Summary Get all mixes
// @Description Retrieve all available DJ mix sessions
// @Produce json
// @Success 200 {object} Response "List of mixes"
// @Failure 500 {object} ErrorResponse "Failed to retrieve mixes"
// @Router /api/v1/mixes [get]
func (h *MixHandler) GetAllMixes(c *gin.Context) {
	mixes, err := h.mixService.GetAllMixes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get mixes"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mixes": mixes})
}
