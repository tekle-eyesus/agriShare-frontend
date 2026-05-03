import { apiClient } from "./client";

export const commonApi = () => ({
  updateProfile: (data) =>
    apiClient("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  updatePassword: (data) =>
    apiClient("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteAccount: () =>
    apiClient("/users/me", {
      method: "DELETE",
    }),
});
