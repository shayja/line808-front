// Package application contains the business logic and use cases
package application

import (
	"backend/internal/domain"
	"context"
)

// LeadService handles lead-related business logic
type LeadService struct {
	leadRepo domain.LeadRepository
}

// NewLeadService creates a new LeadService instance
func NewLeadService(leadRepo domain.LeadRepository) *LeadService {
	return &LeadService{leadRepo: leadRepo}
}

// 1. Context added for cancellation and timeouts
// 2. Accept the Domain entity directly to separate mapping from logic
func (s *LeadService) CreateLead(ctx context.Context, lead domain.Lead) error {
	
	// 3. Domain validation (e.g., check for duplicates or blocked domains)
	// This is where "Architectural thinking" happens.
	return s.leadRepo.CreateLead(ctx, lead)
}