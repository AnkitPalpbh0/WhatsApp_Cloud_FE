import { useEffect, useState } from "react";
import ChatUserList from "./ChatUserList";
import ChatWindow from "./ChatWindow";
import NewChatModal from "./NewChatModal";
import "../Chat/chat.css";
import { useAuth } from "../../context/AuthContext";
import { useGetChatsQuery } from "../../api/chatApi/chatApi";
export default function ChatLayout() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>([]);
  const {
    data: chats,
    isSuccess,
    refetch: chatQueryRefetch,
  } = useGetChatsQuery({ userId: user?.userId }, { skip: !user?.userId });

  useEffect(() => {
    if (isSuccess) {
      setUserData(chats);
    }
  }, [isSuccess]);

  console.log(user, "user");

  const onAddNew = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="chat-container">
      <ChatUserList
        onSelectUser={setSelectedUser}
        onAddNew={onAddNew}
        selectedUser={selectedUser}
        data={userData}
      />
      <ChatWindow
        id={selectedUser?.userId}
        mobileNumber={selectedUser?.mobileNumber}
      />
      <NewChatModal
        isOpen={isModalOpen}
        chatQueryRefetch={chatQueryRefetch}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
