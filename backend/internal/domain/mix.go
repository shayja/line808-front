package domain

type Mix struct {
	Title       string   `json:"title"`
	Description string   `json:"description,omitempty"`
	Length      string   `json:"length"`
	Tags        []string `json:"tags,omitempty"`

	Soundcloud string `json:"soundcloud,omitempty"`
	Mixcloud   string `json:"mixcloud,omitempty"`
	YouTube    string `json:"youtube,omitempty"`

	TrackID  string `json:"track_id,omitempty"`
	Date     string `json:"date,omitempty"`
	Location string `json:"location,omitempty"`
}

type MixRepository interface {
	GetAllMixes() ([]Mix, error)
}
