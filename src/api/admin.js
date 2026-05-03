import { apiClient } from "./client";

export const adminApi = () => ({
  getAllUsers: () =>
    apiClient("/users/admin/users", {
      method: "GET",
    }),
  getActiveUsers: () =>
    apiClient("/users/admin/users?status=active", {
      method: "GET",
    }),
  getUser: (userId) =>
    apiClient(`/users/admin/users/${userId}`, {
      method: "GET",
    }),
  getPendingAssets: () => apiClient("/assets/pending", { method: "GET" }),
  getDashboardData: () =>
    apiClient("/admin/dashboard/overview", { method: "GET" }),
  getVerificationQueue: ({ page = 1, limit = 20 }) =>
    apiClient(`/admin/queues/verifications?page=${page}&limit=${limit}`, {
      method: "GET",
    }),
  getAssetQueue: (status = "all", page = 1, limit = 20) =>
    apiClient(
      `/investments/my-refund-requests?status=${status}&page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    ),
  updateUser: ({ data, userId }) =>
    apiClient(`/users/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  submitRefundRequest: (data) =>
    apiClient("/investments/refund-requests", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  postReview: ({ data, listingId }) =>
    apiClient(`/listings/${listingId}/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  verifyAsset: ({ data, assetId }) =>
    apiClient(`/assets/${assetId}/verify`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteReview: ({ listingId, reviewId }) =>
    apiClient(`/listings/${listingId}/reviews/${reviewId}`, {
      method: "DELETE",
    }),
});
