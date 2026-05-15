import { apiClient } from "./client";

export const commonApi = () => ({
  updateProfile: (data) =>
    apiClient("/users/me", {
      method: "PATCH",
      body: data,
    }),
  changePassword: (data) =>
    apiClient("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteAccount: () =>
    apiClient("/users/me", {
      method: "DELETE",
    }),
  getActiveListings: () => apiClient("/listings/active", { method: "GET" }),
});
