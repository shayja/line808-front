package domain

// Mix represents a DJ mix session
type Mix struct {
	Title       string   `json:"title"`         // Title of the mix
	Description string   `json:"description,omitempty"` // Description of the mix
	Length      string   `json:"length"`        // Duration of the mix
	Tags        []string `json:"tags,omitempty"` // Tags/categories for the mix

	Soundcloud string `json:"soundcloud,omitempty"` // SoundCloud URL
	Mixcloud   string `json:"mixcloud,omitempty"`   // Mixcloud URL
	YouTube    string `json:"youtube,omitempty"`    // YouTube URL

	TrackID  string `json:"track_id,omitempty"`  // Track identification
	Date     string `json:"date,omitempty"`      // Release date
	Location string `json:"location,omitempty"`  // Location where it was recorded
}

// MixRepository defines the interface for mix retrieval operations
type MixRepository interface {
	// GetAllMixes retrieves all available mixes
	// Returns a slice of Mix objects and an error if the operation fails
	GetAllMixes() ([]Mix, error)
}
