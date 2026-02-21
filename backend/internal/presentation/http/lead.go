package http

// CreateLeadRequest defines the expected payload for lead generation
type CreateLeadRequest struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Message string `json:"message" binding:"required"`
	Source  string `json:"source"`
	HP      string `json:"hp"`
}