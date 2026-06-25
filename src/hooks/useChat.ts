import { useState } from "react";
import { UnifiedGrant } from "../utils/normalizeGrantData";
import { askGrantAI } from "../services/aiChatService";

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export default function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function send(grant: UnifiedGrant, question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const answer = await askGrantAI(grant, trimmed);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: answer },
      ]);
    } catch (err) {
      console.error("[useChat] AI chat failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to reach AI. Please check your connection and API key.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, loading, send };
}