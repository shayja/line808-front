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
