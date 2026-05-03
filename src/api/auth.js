import { apiClient } from "./client";

export const authApi = () => ({
  register: (data) =>
    apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data) =>
    apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logout: () =>
    apiClient("/auth/logout", {
      method: "POST",
    }),
  verifyEmail: (data) =>
    apiClient("/auth/verify-email-otp", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  //TODO: what if we only send the email not as object do we need to stringify
  resendOTP: (data) =>
    apiClient("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getAuthenticatedUser: () =>
    apiClient("/users/me", {
      method: "GET",
    }),
});
