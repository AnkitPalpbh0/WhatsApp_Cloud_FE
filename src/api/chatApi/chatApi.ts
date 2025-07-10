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

    // ✅ Delete a Message by ID
    deleteMessage: builder.mutation<void, { messageId: string }>({
      query: ({ messageId }) => ({
        url: `/api/messages/${messageId}`,
        method: "DELETE",
      }),
    }),

    // ✅ Get All Chats of a User
    getChats: builder.query<{ id: number; chatId: number }[], { userId: any }>({
      query: ({ userId }) => `/api/chats/${userId}`,
    }),

    // ✅ Get Messages of a Chat
    getMessages: builder.query<
      {
        id: number;
        messageId: string;
        messageType: string;
        content: string;
        mediaUrl: string | null;
        timestamp: string;
        status: string;
      }[],
      { id: string | number }
    >({
      query: ({ id }) => `/api/chats/messages/${id}`,
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
  useDeleteMessageMutation,
  useGetChatsQuery,
  useGetMessagesQuery,
  useDeleteChatMutation,
} = chatApi;
