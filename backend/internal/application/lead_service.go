package application

import (
	"backend/internal/domain"
)

type LeadService struct {
	leadRepo domain.LeadRepository
}

func NewLeadService(leadRepo domain.LeadRepository) *LeadService {
	return &LeadService{
		leadRepo: leadRepo,
	}
}

func (s *LeadService) CreateLead(name, email, message, source string) error {
	lead := domain.Lead{
		Name:    name,
		Email:   email,
		Message: message,
		Source:  source,
	}

	return s.leadRepo.CreateLead(lead)
}
