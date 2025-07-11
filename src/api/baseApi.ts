import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Optional: Your base URL from .env (Vite uses VITE_ prefix)
const BASE_URL ='https://waba.tools'
export const baseApi = createApi({
  reducerPath: 'api', // slice name in Redux
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}), // you inject endpoints like authApi, messageApi, etc.
})
