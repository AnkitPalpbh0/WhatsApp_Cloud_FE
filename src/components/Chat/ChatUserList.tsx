import { useEffect } from "react";
import "../Chat/chat.css";

type ChatUser = {
  id: number;
  chatId: string;
};

type Props = {
  onSelectUser: (user: { userId: number; mobileNumber: string }) => void;
  onAddNew: () => void;
  selectedUser: ChatUser | null;
  data: ChatUser[];
};

export default function ChatUserList({
  onSelectUser,
  onAddNew,
  selectedUser,
  data,
}: Props) {

  // Select the first user by default
  useEffect(() => {
    if (data.length > 0 && !selectedUser) {
      onSelectUser({
        userId: data[0].id,
        mobileNumber: data[0].chatId,
      });
    }
  }, [data, selectedUser, onSelectUser]);

  return (
    <div className="chat-sidebar">
      <div className="chat-header">
        <h2>Chats</h2>
        <button className="btn-primary" onClick={onAddNew}>
          + Add Number
        </button>
      </div>
      <ul className="chat-user-list">
        {data.map((user) => (
          <li
            key={user.id}
            onClick={() =>
              onSelectUser({
                userId: user.id,
                mobileNumber: user.chatId,
              })
            }
            className={`chat-user ${
              selectedUser?.id === user.id ? "active" : ""
            }`}
          >
            {user.chatId}
          </li>
        ))}
      </ul>
    </div>
  );
}
