import { apiClient } from "./client";

export const investorApi = () => ({
  getListingReviews: ({ id, page = 1, limit = 10 }) =>
    apiClient(`/listings/${id}/reviews?page=${page}&limit=${limit}`, {
      method: "GET",
    }),
  getActiveContracts: () =>
    apiClient("/investments/contracts", { method: "GET" }),
  getActiveInvestments: () =>
    apiClient("/investments/my-active", { method: "GET" }),
  getInvestmentHistory: () =>
    apiClient("/investments/my-history", { method: "GET" }),
  getRefundRequest: ({ status = "all", page = 1, limit = 20 }) =>
    apiClient(
      `/investments/my-refund-requests?status=${status}&page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    ),
  buyShares: (data) =>
    apiClient("/investments/buy", {
      method: "POST",
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
  editReview: ({ data, listingId, reviewId }) =>
    apiClient(`/listings/${listingId}/reviews/${reviewId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteReview: ({ listingId, reviewId }) =>
    apiClient(`/listings/${listingId}/reviews/${reviewId}`, {
      method: "DELETE",
    }),
});
