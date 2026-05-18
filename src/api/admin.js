import { apiClient } from "./client";

export const adminApi = () => ({
  getAllUsers: ({ role, status = "all", search, page = 1, limit = 20 } = {}) => {
    const params = new URLSearchParams({ page, limit, status });
    if (role) params.append("role", role);
    if (search) params.append("search", search);
    return apiClient(`/users/admin/users?${params.toString()}`, {
      method: "GET",
    });
  },
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
  getAssetQueue: ({ status = "all", page = 1, limit = 20 }) =>
    apiClient(
      `/admin/queues/assets?status=${status}&page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    ),
  getRefundRequests: ({ status = "all", page = 1, limit = 20 }) =>
    apiClient(
      `/investments/admin/refund-requests?status=${status}&page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    ),
  getListingsRiskQueue: ({
    page = 1,
    limit = 10,
    daysWindow = 10,
    maxFundingProgressPercent = 80,
  }) =>
    apiClient(
      `/admin/queues/listings-risk?page=${page}&limit=${limit}&daysWindow=${daysWindow}&maxFundingProgressPercent=${maxFundingProgressPercent}`,
      {
        method: "GET",
      },
    ),

  getPendingVerifications: () =>
    apiClient("/farmer-verifications/pending", { method: "GET" }),
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
  reviewRefund: ({ data, refundRequestId }) =>
    apiClient(`/investments/admin/refund-requests/${refundRequestId}/review`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  verifyFarmer: ({ id, data }) =>
    apiClient(`/farmer-verifications/${id}/review`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteReview: ({ listingId, reviewId }) =>
    apiClient(`/listings/${listingId}/reviews/${reviewId}`, {
      method: "DELETE",
    }),
});
