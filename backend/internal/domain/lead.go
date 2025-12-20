// Package domain contains the core business models and repository interfaces
package domain

// Lead represents a potential customer lead
type Lead struct {
	Name    string `json:"name"`    // Name of the lead
	Email   string `json:"email"`   // Email address of the lead
	Message string `json:"message"` // Message from the lead
	Source  string `json:"source,omitempty"` // Source of the lead (optional)
}

// LeadRepository defines the interface for lead persistence operations
type LeadRepository interface {
	// CreateLead creates a new lead in the system
	// Returns an error if the operation fails
	CreateLead(lead Lead) error
}
