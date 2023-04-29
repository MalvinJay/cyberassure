// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../../../../services/config'
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({ 
  baseUrl: api.defaults.baseURL,
  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get("token");
    console.log('current state:', getState())

    // If we have a token set in state, let's assume that we should be passing it.
    headers.set('Content-Type', 'application/json');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
