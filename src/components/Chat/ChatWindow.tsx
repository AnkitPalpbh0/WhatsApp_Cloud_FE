import { useEffect, useRef, useState } from "react";
import {
  useGetMessagesQuery,
  useSendTextMutation,
  useSendMediaMessageMutation,
} from "../../api/chatApi/chatApi";
import "../Chat/chat.css";
import {
  getPresignedUrl,
  uploadFile,
} from "../../utils/uploadS3";

type Props = {
  id: string | null;
  mobileNumber: string | null;
};

export default function ChatWindow({ id, mobileNumber }: Props) {
  const [message, setMessage] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [sendText, { isLoading: isSending }] = useSendTextMutation();
  const [sendMediaMessage] = useSendMediaMessageMutation();

  const {
    data: messages,
    isLoading,
    isError,
    refetch,
  } = useGetMessagesQuery({ id: id! }, { skip: !id });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (previewFile) {
      const url = URL.createObjectURL(previewFile);
      setPreviewURL(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewURL(null);
    }
  }, [previewFile]);

  // Generate signed URLs for private S3 media
  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (!messages) return;

      const urlMap: Record<string, string> = {};

      await Promise.all(
        messages
          .filter((msg) => msg.mediaUrl)
          .map(async (msg) => {
            if (!msg.mediaUrl || signedUrls[msg.mediaUrl]) return;

            try {
              const url = await getPresignedUrl(msg.mediaUrl);
              urlMap[msg.mediaUrl] = url;
            } catch (err) {
              console.error("Failed to get signed URL for", msg.mediaUrl, err);
            }
          })
      );

      setSignedUrls((prev) => ({ ...prev, ...urlMap }));
    };

    fetchSignedUrls();
  }, [messages]);

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

  const handleMediaSend = async () => {
    if (!mobileNumber || !previewFile) return;

    const mimeType = previewFile.type;
    try {
      const mediaUrl = await uploadFile(previewFile);
      if (!mediaUrl) throw new Error("Media upload failed");

      const mediaType = mimeType.startsWith("image")
        ? "image"
        : mimeType.startsWith("video")
        ? "video"
        : "document";

      await sendMediaMessage({
        mediaUrl,
        to: mobileNumber,
        mimeType,
        type: mediaType,
        caption: previewFile.name,
      }).unwrap();

      setPreviewFile(null);
      refetch();
    } catch (err) {
      console.error("Media send failed", err);
    }
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  if (!id || !mobileNumber)
    return <div className="chat-placeholder">Select a user to chat</div>;
  if (isLoading) return <div className="chat-placeholder">Loading...</div>;
  if (isError)
    return <div className="chat-placeholder">Error loading messages</div>;

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
            const url = msg.mediaUrl ? signedUrls[msg.mediaUrl] : "";

            return (
              <div
                key={msg.id}
                className={`chat-bubble ${isReceived ? "left" : "right"}`}
              >
                {msg.messageType === "text" && (
                  <p>{msg.content || "No content"}</p>
                )}
                {msg.mediaUrl && url && (
                  <div>
                    {msg.messageType === "image" && (
                      <img src={url} alt="media" className="chat-media" />
                    )}
                    {msg.messageType === "video" && (
                      <video controls className="chat-media">
                        <source src={url} type="video/mp4" />
                      </video>
                    )}
                    {msg.messageType === "document" && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chat-document-link"
                      >
                        📄 {msg.content || msg.mediaUrl.split("/").pop()}
                      </a>
                    )}
                  </div>
                )}
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

      {/* Preview Area */}
      {previewFile && previewURL && (
        <div className="chat-preview">
          <div className="preview-header">
            <span>Preview</span>
            <button onClick={() => setPreviewFile(null)}>❌</button>
          </div>
          <div className="preview-body">
            {previewFile.type.startsWith("image") ? (
              <img src={previewURL} className="preview-media" />
            ) : previewFile.type.startsWith("video") ? (
              <video controls className="preview-media">
                <source src={previewURL} />
              </video>
            ) : (
              <p>📄 {previewFile.name}</p>
            )}
          </div>
          <button className="chat-send-btn" onClick={handleMediaSend}>
            Send
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="chat-input-area">
        <button className="file-upload-icon" onClick={triggerFilePicker}>
          📎
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreviewFile(file);
          }}
        />

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
          {isSending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
