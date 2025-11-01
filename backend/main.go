package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Mix struct {
	Title  string   `json:"title"`
	Description string `json:"description,omitempty"`
	Length string   `json:"length"`
	Tags   []string `json:"tags"`
	Soundcloud    string   `json:"soundcloud,omitempty"`
	Mixcloud      string   `json:"mixcloud,omitempty"`
	TrackID string    `json:"track_id,omitempty"`
	Date   string   `json:"date,omitempty"`
	Location string   `json:"location,omitempty"`
}

func main() {
	r := gin.Default()

	// --- CORS middleware ---
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// --- Routes ---
	r.GET("/api/v1/mixes", func(c *gin.Context) {
		mixes := []Mix{
			{
				Title:  "Deep Signal",
				Description: "Deep, hypnotic, and raw — this mix flows through layers of rhythm and tension. -A selection of new R/D/H techno tracks that capture the essence of the underground groove. Every track here is fresh, powerful, and timeless.\r\nTacks by: Efdemin, Arkan, Altinbas, Hiroaki Iizuka, Inigo Kennedy, Amotik, Shlomi Aber, 10.000 BC, Yan Cook, 1morning, Ciarra Black, ANNE, Invexis & The Sixth Sense, Nastia Reigel",
				Length: "1:02:59",
				Tags:   []string{"Peaktime", "RDH", "Hypnotic", "130BPM", "Deep Techno"},
				Soundcloud: "https://soundcloud.com/line808/deep-signal-dj-mix",
				Mixcloud: "https://www.mixcloud.com/line808/line808-deep-signal-techno-mix-october-2025/",
				TrackID: "253A2193903315",
				Date: "2025-10-20",
				Location: "Tel Aviv",
			},
			{
				Title:  "Memory Circuit",
				Description: "Line808 – Groove Techno Mix (October 2025)",
				Length: "1:16:00",
				Tags:   []string{"Raw", "Deep", "Deep Techno"},
				Soundcloud: "https://soundcloud.com/line808/dj-set-2025-10",
				Mixcloud: "https://www.mixcloud.com/line808/dj-line808-memory-circuit-dj-mix/",
				TrackID: "253A2190285995",
				Date: "2025-10-10",
				Location: "Tel Aviv",
			},
			// {
			// 	Title:  "Tel Aviv Warehouse Set",
			// 	Length: "72:09",
			// 	Tags:   []string{"Peaktime", "Industrial", "Live"},
			// 	URL:    "https://soundcloud.com/line808/tel-aviv-warehouse-set",
			// },
		}

		c.JSON(http.StatusOK, gin.H{"mixes": mixes})
	})

	// --- Start server ---
	r.Run(":8080")
}
