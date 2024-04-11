  import { apiSliceAdmin } from "./apiSliceAdmin";
  const ADMIN_URL = "/api/admin";
  export const adminApiSlice = apiSliceAdmin.injectEndpoints({
    endpoints: (builder) => ({
      adminLogin: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/auth`,
          method: "POST",
          body: data,
        }),
      }),
    getUsers: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/user-list?page=${data.page}&key=${data.key}`,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adduser`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/edituser`,
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
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/deleteuser`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetUsersMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApiSlice;