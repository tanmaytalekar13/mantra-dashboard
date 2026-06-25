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

  async function send(
    grant: UnifiedGrant,
    question: string
  ) {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setLoading(true);

    try {
      const answer = await askGrantAI(
        grant,
        question
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: answer,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    send,
  };
}