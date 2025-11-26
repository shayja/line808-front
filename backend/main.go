package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

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

var mixes = []Mix{
	{
		Title:       "Forge TLV Sessions 002",
		Description: "Deep, hypnotic, and raw — this mix flows through layers of rhythm and tension. A selection of new R/D/H techno tracks that capture the essence of the underground groove.",
		Length:      "1:02:59",
		Tags:        []string{"Peaktime", "RDH", "Hypnotic", "130BPM", "Deep Techno"},
		Soundcloud:  "https://soundcloud.com/line808/deep-signal-dj-mix",
		Mixcloud:    "https://www.mixcloud.com/line808/line808-deep-signal-techno-mix-october-2025/",
		TrackID:     "253A2193903315",
		Date:        "2025-10-20",
		Location:    "Tel Aviv",
	},
	{
		Title:       "Forge TLV Sessions 001",
		Description: "Line808 - Groove Techno Mix (October 2025)",
		Length:      "1:16:00",
		Tags:        []string{"Raw", "Deep", "Deep Techno", "130BPM", "Groove", "RDH"},
		Soundcloud:  "https://soundcloud.com/line808/dj-set-2025-10",
		Mixcloud:    "https://www.mixcloud.com/line808/dj-line808-memory-circuit-dj-mix/",
		YouTube:     "9tWIqiRTVeE",
		TrackID:     "253A2190285995",
		Date:        "2025-10-10",
		Location:    "Tel Aviv",
	},
	{
		Title:       "Forge TLV Sessions 004",
		Description: "Peak-Time Hard Techno from Tel Aviv's underground. Explosive kicks, relentless drive, and razor-sharp grooves - this Forge TLV chapter hits straight to the core. Industrial pressure, rave energy, and hypnotic tension built for dark rooms and late-night chaos.",
		Length:      "1:05:52",
		Tags:        []string{"Peaktime", "Techno", "Deep Techno", "DJ Set", "Live"},
		Mixcloud:    "https://www.mixcloud.com/line808/dj-line808-forge-tlv-sessions-004-techno-mix-2025/",
		Date:        "2025-11-25",
		Location:    "Tel Aviv",
	},
	{
		Title:       "Forge TLV Sessions 003",
		Description: "This third chapter of the Forge TLV Sessions series blends Raw, Deep & Hypnotic techno with emotional melodic flow.",
		Length:      "1:05:52",
		Tags:        []string{"Peaktime", "Techno", "Deep Techno", "Melodic Techno", "Live"},
		Mixcloud:    "https://www.mixcloud.com/line808/dj-line808-forge-tlv-sessions-003-techno-mix-2025/",
		Date:        "2025-10-10",
		Location:    "Tel Aviv",
	},
}

func main() {
		// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	r := gin.Default()

	// Optional, but recommended on newer Gin
	_ = r.SetTrustedProxies(nil)

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	})

	// Routes
	r.GET("/api/v1/mixes", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"mixes": mixes})
	})
	r.POST("/api/v1/leads", createLeadHandler)
	

	// Start server
	r.Run(":8080")
}
