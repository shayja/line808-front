// Package memory provides in-memory implementations of repositories
package memory

import "backend/internal/domain"

// MemoryMixRepository implements an in-memory repository for mixes
type MemoryMixRepository struct {
	mixes []domain.Mix
}

// NewMemoryMixRepository creates a new in-memory mix repository with predefined data
func NewMemoryMixRepository() domain.MixRepository {
	return &MemoryMixRepository{
		mixes: []domain.Mix{
			{
				Title:       "Forge TLV Sessions 004",
				Description: "Experience a hard techno DJ set with peak-time energy and underground vibe. This techno mix captures the raw energy of Tel Aviv club culture with hypnotic industrial rhythms and live DJ set flow.",
				Length:      "1:24:56",
				Tags:        []string{"Techno DJ", "Hard techno mix", "Live DJ set", "Tel Aviv club DJ", "Peak-time techno", "Underground techno"},
				Mixcloud:    "https://www.mixcloud.com/line808/dj-line808-forge-tlv-sessions-004-techno-mix-2025/",
				Date:        "2025-11-25",
				Location:    "Tel Aviv",
			},
			{
				Title:       "Forge TLV Sessions 003",
				Description: "The third chapter of Forge TLV Sessions dives into Raw, Deep & Hypnotic techno with a strong emotional undercurrent.\nPowerful grooves meet evolving melodic tension, creating a deep underground flow designed for immersive listening and late-night movement.",
				Length:      "1:05:52",
				Tags:        []string{"Raw", "Deep", "Hypnotic Techno", "Melodic Techno", "Live", "Live Mix", "Techno Session", "Techno Mix"},
				Mixcloud:    "https://www.mixcloud.com/line808/dj-line808-forge-tlv-sessions-003-techno-mix-2025/",
				Date:        "2025-10-10",
				Location:    "Tel Aviv",
			},
			{
				Title:       "Forge TLV Sessions 002",
				Description: "Deep, hypnotic, and raw - a tightly woven journey through layered rhythms and building tension.\nThis session captures the essence of RDH techno: rolling grooves, subtle shifts, and underground energy that keeps the listener locked in from start to finish.",
				Length:      "1:02:59",
				Tags:        []string{"Raw", "Deep", "Hypnotic Techno", "Melodic Techno", "Live"},
				Soundcloud:  "https://soundcloud.com/line808/deep-signal-dj-mix",
				Mixcloud:    "https://www.mixcloud.com/line808/line808-deep-signal-techno-mix-october-2025/",
				TrackID:     "253A2193903315",
				Date:        "2025-10-20",
				Location:    "Tel Aviv",
			},
			{
				Title:       "Forge TLV Sessions 001",
				Description: "The foundation of the Forge TLV Sessions series.\nA groove-driven techno set blending raw textures, deep rhythms, and steady hypnotic momentum - setting the tone for the sound, direction, and underground identity of DJ Line808.",
				Length:      "1:16:00",
				Tags:        []string{"Groove", "Deep", "Deep Techno", "130BPM", "RDH"},
				Soundcloud:  "https://soundcloud.com/line808/dj-set-2025-10",
				Mixcloud:    "https://www.mixcloud.com/line808/dj-line808-memory-circuit-dj-mix/",
				YouTube:     "9tWIqiRTVeE",
				TrackID:     "253A2190285995",
				Date:        "2025-10-10",
				Location:    "Tel Aviv",
			},
		},
	}
}

// GetAllMixes returns all available mixes from the in-memory store
// Implements the domain.MixRepository interface
func (r *MemoryMixRepository) GetAllMixes() ([]domain.Mix, error) {
	return r.mixes, nil
}
