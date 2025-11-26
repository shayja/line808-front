// src/components/ContactForm.tsx
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source: "contact-form",
          hp: "", // honeypot – keep empty
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      let msg = "Something went wrong";

      if (err instanceof Error) {
        msg = err.message;
      }

      setError(msg);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111216] border border-gray-800 rounded-xl px-6 py-5 max-w-md w-full text-left space-y-4"
    >
      <h2 className="text-lg font-semibold">Send a message</h2>
      <p className="text-xs text-gray-500">
        Use the form or email directly - whatever works for you.
      </p>

      {/* Honeypot field – hidden from users */}
      <div className="hidden">
        <label>
          Leave this field empty
          <input name="hp" autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Name
        </label>
        <input
          className="w-full rounded-md bg-[#050509] border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-[--color-primary]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-md bg-[#050509] border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-[--color-primary]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-300 mb-1">
          Message
        </label>
        <textarea
          className="w-full rounded-md bg-[#050509] border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:border-[--color-primary]"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold border border-[--color-primary] hover:bg-[--color-primary]/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-xs text-green-400 mt-1">
          Thanks - I’ll review your message and get back to you.
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-400 mt-1">
          {error ?? "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
