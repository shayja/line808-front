package application

import "backend/internal/domain"

type MixService struct {
	mixRepo domain.MixRepository
}

func NewMixService(mixRepo domain.MixRepository) *MixService {
	return &MixService{
		mixRepo: mixRepo,
	}
}

func (s *MixService) GetAllMixes() ([]domain.Mix, error) {
	return s.mixRepo.GetAllMixes()
}
