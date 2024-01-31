import { adminApiSlice } from "./adminapiSlice";

const ADMIN_URL = "/admin";

export const adminApi = adminApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminlogin`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    addUser: builder.mutation({
      query: () => ({
        url: `http://localhost:3001/admin/add`,
        method: "POST",
      }),
    }),
  }),
});

export const { useAdminloginMutation, useLogoutMutation, useAddUserMutation } =
  adminApi;
