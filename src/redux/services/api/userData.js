// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseApi } from './baseApi'; 

// Define a service using a base URL and expected endpoints
export const userApi = baseApi.injectEndpoints({
  reducerPath: 'userApi',
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => 'user/get-user-profile',
    }),
    getUsers: builder.query({
      query: () => 'user/get-users',
    })
  }),
  overrideExisting: false
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserProfileQuery, useGetUsersQuery } = userApi;
