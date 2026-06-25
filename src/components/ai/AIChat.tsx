import { useState } from "react";
import useChat from "../../hooks/useChat";
import { UnifiedGrant } from "../../utils/normalizeGrantData";

interface Props {
  grant: UnifiedGrant;
}

export default function AIChat({
  grant,
}: Props) {
  const [question, setQuestion] =
    useState("");

  const {
    messages,
    loading,
    send,
  } = useChat();

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        🤖 AI Assistant
      </h2>

      <div className="h-96 overflow-y-auto rounded-lg border p-4">

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user"
                ? "text-right"
                : ""
            }`}
          >
            <div
              className={`inline-block rounded-lg px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

      </div>

      <div className="mt-5 flex gap-3">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="flex-1 rounded-lg border p-3"
          placeholder="Ask anything..."
        />

        <button
          onClick={() => {
            send(grant, question);
            setQuestion("");
          }}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 text-white"
        >
          {loading
            ? "..."
            : "Send"}
        </button>

      </div>

    </div>
  );
}