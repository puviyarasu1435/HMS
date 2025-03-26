import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hms-api-ibja.onrender.com" }),
  tagTypes: ["user","test"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => `/users`,
      providesTags: ["user","test"],
    }),
    fetchUsersByid: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
    CreateUser: builder.mutation({
      query: (Data) => ({
        url: "/create_user",
        method: "POST",
        body: Data,
      }),
      invalidatesTags: ["test"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useFetchUsersQuery,
  useFetchUsersByidQuery,
  useCreateUserMutation
} = UserApi;
