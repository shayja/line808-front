// Package main is the entry point for the backend application
package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"backend/internal/application"
	"backend/internal/domain"
	"backend/internal/infrastructure/airtable"
	"backend/internal/infrastructure/memory"
	presentation "backend/internal/presentation/http"
	"backend/pkg/cache"
	"backend/pkg/config"

	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration from .env file
	config.Load()

	// Initialize dependencies
	airtableCfg := airtable.Config{
		BaseID:    config.GetEnv("AIRTABLE_BASE_ID", ""),
		TableName: config.GetEnv("AIRTABLE_TABLE_NAME", ""),
		Token:     config.GetEnv("AIRTABLE_TOKEN", ""),
	}

	leadRepo, err := airtable.NewAirtableLeadRepository(airtableCfg)
	if err != nil {
		log.Fatalf("Failed to create Airtable lead repository: %v", err)
	}

	leadService := application.NewLeadService(leadRepo)
	leadHandler := presentation.NewLeadHandler(leadService)

	// Initialize cache with 1 hour TTL for mixes
	mixCache := cache.NewCache[[]domain.Mix](1 * time.Hour)
	mixRepo := memory.NewMemoryMixRepository()
	mixService := application.NewMixService(mixRepo)
	mixHandler := presentation.NewMixHandler(mixService, mixCache, "all_mixes")

	// Initialize Gin router
	r := gin.Default()
	_ = r.SetTrustedProxies(nil)

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", config.GetEnv("ALLOWED_ORIGINS", "*"))
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// API Routes
	api := r.Group("/api/v1")
	{
		api.GET("/mixes", mixHandler.GetAllMixes)
		api.POST("/leads", leadHandler.CreateLead)
	}

	// Server Configuration
	srv := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	// Graceful Shutdown
	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")
}
