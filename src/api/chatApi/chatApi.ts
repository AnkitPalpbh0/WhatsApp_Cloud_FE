import { baseApi } from "../baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Send a Text Message
    sendText: builder.mutation<void, { to: string; content: string }>({
      query: (body) => ({
        url: "/api/messages/sendTextMessage",
        method: "POST",
        body,
      }),
    }),

    sendMediaMessage: builder.mutation<
      void,
      {
        mediaUrl: string;
        to: string;
        mimeType: string;
        type: "image" | "video" | "document";
        caption: string;
      }
    >({
      query: (body) => ({
        url: "/api/messages/send-media",
        method: "POST",
        body,
      }),
    }),

    // ✅ Get All Chats of a User
    getChats: builder.query<
      { id: number; chatId: number }[],
      { userId: string }
    >({
      query: ({ userId }) => `/api/chats/${userId}`,
    }),

    // ✅ Get Messages of a Chat (Updated Endpoint)
    getMessages: builder.query<
      {
        id: number;
        messageId: string;
        messageType: string;
        content: string;
        mediaUrl: string;
        mimeType: string; // ✅ Add this line
        timestamp: string;
        status: string;
      }[],
      { id: string | number }
    >({
      query: ({ id }) => `/api/chats/messages/${id}`,
    }),

    // ✅ Delete a Message by ID
    deleteMessage: builder.mutation<void, { messageId: string }>({
      query: ({ messageId }) => ({
        url: `/api/messages/${messageId}`,
        method: "DELETE",
      }),
    }),

    // ✅ Delete a Chat by ID
    deleteChat: builder.mutation<void, { chatId: string | number }>({
      query: ({ chatId }) => ({
        url: `/api/chats/delete/${chatId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendTextMutation,
  useSendMediaMessageMutation,
  useDeleteMessageMutation,
  useGetChatsQuery,
  useGetMessagesQuery,
  useDeleteChatMutation,
} = chatApi;
