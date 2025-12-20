// Package application contains the business logic and use cases
package application

import (
	"backend/internal/domain"
)

// LeadService handles lead-related business logic
type LeadService struct {
	leadRepo domain.LeadRepository
}

// NewLeadService creates a new LeadService instance
func NewLeadService(leadRepo domain.LeadRepository) *LeadService {
	return &LeadService{
		leadRepo: leadRepo,
	}
}

// CreateLead creates a new lead with the provided information
// Parameters:
//   - name: Name of the lead
//   - email: Email address of the lead
//   - message: Message from the lead
//   - source: Optional source of the lead
// Returns an error if the operation fails
func (s *LeadService) CreateLead(name, email, message, source string) error {
	lead := domain.Lead{
		Name:    name,
		Email:   email,
		Message: message,
		Source:  source,
	}

	return s.leadRepo.CreateLead(lead)
}
