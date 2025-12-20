// Package http contains HTTP handlers for the presentation layer
package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"backend/internal/application"
	"backend/pkg/cache"
)

// MixHandler handles HTTP requests related to mixes
type MixHandler struct {
	mixService *application.MixService
	cache      *cache.Cache
	cacheKey   string
}

// NewMixHandler creates a new MixHandler instance
// Parameters:
//   - mixService: Mix service for business logic
//   - cache: Cache instance for caching responses
//   - cacheKey: Key to use for caching mixes data
func NewMixHandler(mixService *application.MixService, cache *cache.Cache, cacheKey string) *MixHandler {
	return &MixHandler{
		mixService: mixService,
		cache:      cache,
		cacheKey:   cacheKey,
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
	// Try to get cached response first
	if h.cache != nil {
		if cachedMixes, found := h.cache.Get(h.cacheKey); found {
			c.JSON(http.StatusOK, gin.H{"mixes": cachedMixes})
			return
		}
	}

	// Cache miss - fetch from service
	mixes, err := h.mixService.GetAllMixes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get mixes"})
		return
	}

	// Cache the response for future requests
	if h.cache != nil {
		h.cache.Set(h.cacheKey, mixes)
	}

	c.JSON(http.StatusOK, gin.H{"mixes": mixes})
}
