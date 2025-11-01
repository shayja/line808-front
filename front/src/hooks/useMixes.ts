import { useEffect, useState } from "react";

export type Mix = {
  title: string;
  description?: string;
  length: string;
  tags: string[];
  soundcloud: string;
  mixcloud?: string;
  track_id?: string;
  date?: string;
  location?: string;
};

export function useMixes() {
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/mixes")
      .then((res) => res.json())
      .then((data) => {
        const raw = Array.isArray(data?.mixes) ? data.mixes : [];
        const normalized: Mix[] = raw.map((m: Mix) => ({
          title: m.title,
          description: m.description,
          length: m.length ?? "",
          tags: Array.isArray(m.tags) ? m.tags : [],
          soundcloud: m.soundcloud ?? "",
          mixcloud: m.mixcloud ?? "",
          track_id: m.track_id,
          date: m.date,
          location: m.location,
        }));
        setMixes(normalized);
      })
      .catch((err) => {
        console.error("Failed to load mixes", err);
        setError("Failed to load mixes");
      })
      .finally(() => setLoading(false));
  }, []);

  return { mixes, loading, error };
}
