import { useEffect, useRef, useState } from "react";
import {
  useGetMessagesQuery,
  useSendTextMutation,
} from "../../api/chatApi/chatApi";
import "../Chat/chat.css";

type Props = {
  id: string | null;
  mobileNumber: string | null;
};

export default function ChatWindow({ id, mobileNumber }: Props) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    data: messages,
    isLoading,
    isError,
    refetch,
  } = useGetMessagesQuery({ id: id! }, { skip: !id });

  const [sendText, { isLoading: isSending }] = useSendTextMutation();

  const handleSend = async () => {
    if (!mobileNumber || !message.trim()) return;
    try {
      await sendText({ to: mobileNumber, content: message }).unwrap();
      setMessage("");
      refetch();
    } catch (err) {
      console.error("Send failed", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!id || !mobileNumber)
    return <div className="chat-placeholder">Select a user to chat</div>;

  if (isLoading)
    return <div className="chat-placeholder">Loading messages...</div>;

  if (isError)
    return <div className="chat-placeholder">Error loading messages.</div>;

  return (
    <div className="chat-window">
      <div className="chat-title">Chat with: {mobileNumber}</div>

      <div className="chat-history">
        {messages
          ?.slice()
          .sort(
            (a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )
          .map((msg) => {
            const isReceived = msg.status === "received";
            const isRead = msg.status === "READ";
            // const isDelivered = msg.status === "DELIVERED";

            return (
              <div
                key={msg.id}
                className={`chat-bubble ${isReceived ? "left" : "right"}`}
              >
                <p>{msg.content || "No content"}</p>
                <div className="chat-meta">
                  <span className="chat-timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {!isReceived && (
                    <span
                      className={`chat-tick ${
                        isRead ? "tick-blue" : "tick-grey"
                      }`}
                    >
                      ✓✓
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          className="chat-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
