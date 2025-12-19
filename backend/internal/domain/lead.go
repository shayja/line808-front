package domain

type Lead struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
	Source  string `json:"source,omitempty"`
}

type LeadRepository interface {
	CreateLead(lead Lead) error
}
