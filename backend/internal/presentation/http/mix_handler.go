package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"backend/internal/application"
)

type MixHandler struct {
	mixService *application.MixService
}

func NewMixHandler(mixService *application.MixService) *MixHandler {
	return &MixHandler{
		mixService: mixService,
	}
}

func (h *MixHandler) GetAllMixes(c *gin.Context) {
	mixes, err := h.mixService.GetAllMixes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get mixes"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"mixes": mixes})
}
