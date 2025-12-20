// Package application contains the business logic and use cases
package application

import "backend/internal/domain"

// MixService handles mix-related business logic
type MixService struct {
	mixRepo domain.MixRepository
}

// NewMixService creates a new MixService instance
func NewMixService(mixRepo domain.MixRepository) *MixService {
	return &MixService{
		mixRepo: mixRepo,
	}
}

// GetAllMixes retrieves all available mixes from the repository
// Returns a slice of Mix objects and an error if the operation fails
func (s *MixService) GetAllMixes() ([]domain.Mix, error) {
	return s.mixRepo.GetAllMixes()
}
