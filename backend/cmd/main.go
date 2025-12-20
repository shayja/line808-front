// Package main is the entry point for the backend application
package main

import (
	"log"

	"backend/internal/application"
	"backend/internal/infrastructure/airtable"
	"backend/internal/infrastructure/memory"
	"backend/internal/presentation/http"
	"backend/pkg/config"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration from .env file
	config.Load()

	// Set up dependencies using dependency injection
	leadRepo, err := airtable.NewAirtableLeadRepository()
	if err != nil {
		log.Fatalf("Failed to create Airtable lead repository: %v", err)
	}
	leadService := application.NewLeadService(leadRepo)
	leadHandler := http.NewLeadHandler(leadService)

	mixRepo := memory.NewMemoryMixRepository()
	mixService := application.NewMixService(mixRepo)
	mixHandler := http.NewMixHandler(mixService)

	// Initialize Gin router with default middleware (logger, recovery)
	r := gin.Default()

	// Optional, but recommended on newer Gin versions
	_ = r.SetTrustedProxies(nil)

	// CORS middleware - configure Cross-Origin Resource Sharing
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

	// API Routes
	r.GET("/api/v1/mixes", mixHandler.GetAllMixes)  // Get all DJ mixes
	r.POST("/api/v1/leads", leadHandler.CreateLead) // Create a new lead

	// Start HTTP server on port 8080
	r.Run(":8080")
}
