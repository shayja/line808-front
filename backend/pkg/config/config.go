// Package config provides configuration management utilities
package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Load loads configuration from .env file
// This should be called at application startup
func Load() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}
}

// GetEnv retrieves an environment variable with a fallback default value
// Parameters:
//   - key: The environment variable name
//   - defaultValue: The value to return if the environment variable is not set
// Returns the environment variable value or the default value if not set
func GetEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
