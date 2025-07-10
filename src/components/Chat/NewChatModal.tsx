import React, { useState } from "react";
import "../Chat/chat.css";
import { useSendTextMutation } from "../../api/chatApi/chatApi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  chatQueryRefetch: any;
};

export default function NewChatModal({
  isOpen,
  onClose,
  chatQueryRefetch,
}: Props) {
  const [chatData, setChatData] = useState({ to: "", content: "" });

  const [sendTextApi] = useSendTextMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendTextApi(chatData).unwrap();
      console.log("Message sent:", res);
      onClose();
      chatQueryRefetch();
    } catch (err) {
      onClose();

      console.error("Send failed", err);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await loginApi(formData).unwrap();
  //     login(res.token); // Save token in context
  //     navigate("/chat");
  //   } catch (err) {
  //     console.error("Login failed", err);
  //   }
  // };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Start New Chat</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            placeholder="Phone Number"
            value={chatData.to}
            onChange={(e) =>
              setChatData((prev) => ({ ...prev, to: e.target.value }))
            }
            required
          />

          <textarea
            placeholder="Message"
            value={chatData.content}
            onChange={(e) =>
              setChatData((prev) => ({ ...prev, content: e.target.value }))
            }
            required
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
