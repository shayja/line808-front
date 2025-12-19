package main

import (
	"backend/internal/application"
	"backend/internal/infrastructure/airtable"
	"backend/internal/infrastructure/memory"
	"backend/internal/presentation/http"
	"backend/pkg/config"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	config.Load()

	// Set up dependencies
	leadRepo := airtable.NewAirtableLeadRepository()
	leadService := application.NewLeadService(leadRepo)
	leadHandler := http.NewLeadHandler(leadService)

	mixRepo := memory.NewMemoryMixRepository()
	mixService := application.NewMixService(mixRepo)
	mixHandler := http.NewMixHandler(mixService)

	// Initialize Gin router
	r := gin.Default()

	// Optional, but recommended on newer Gin
	_ = r.SetTrustedProxies(nil)

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	r.GET("/api/v1/mixes", mixHandler.GetAllMixes)
	r.POST("/api/v1/leads", leadHandler.CreateLead)

	// Start server
	r.Run(":8080")
}
