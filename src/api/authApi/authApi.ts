import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<
      void,
      { name: string; email: string; phone: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<{ jwt: string; userId: string }, { auth: boolean }>(
      {
        query: (body) => ({
          url: "/auth/signin",
          method: "POST",
          body,
        }),
      }
    ),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
