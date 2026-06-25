import { useEffect, useRef, useState } from "react";
import useChat from "../../hooks/useChat";
import { UnifiedGrant } from "../../utils/normalizeGrantData";

interface Props {
  grant: UnifiedGrant;
}

export default function AIChat({ grant }: Props) {
  const [question, setQuestion] = useState("");
  const { messages, loading, send } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!question.trim() || loading) return;
    send(grant, question);
    setQuestion("");
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-1 text-xl font-bold text-gray-800">AI Assistant</h2>
      <p className="text-xs text-gray-400 mb-5">
        Ask questions about this grant. Answers are grounded in the data shown above.
      </p>

      {/* Message thread */}
      <div className="h-80 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50 p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-20">
            Ask a question about {grant.name}…
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-100 text-gray-800 shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-400 shadow-sm">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          placeholder="e.g. What is the budget utilization for this grant?"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !question.trim()}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}