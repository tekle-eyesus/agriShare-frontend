import { apiClient } from "./client";

export const farmerApi = () => ({
  getDashboardData: () =>
    apiClient("/users/farmer/dashboard", { method: "GET" }),
  getAssets: () => apiClient("/assets/my-assets", { method: "GET" }),
  getAsset: (assetId) => apiClient(`/assets/${assetId}`, { method: "GET" }),
  getListings: () => apiClient("/listings/my-listings", { method: "GET" }),
  getActiveListings: () => apiClient("/listings/active", { method: "GET" }),
  getListing: (listingId) =>
    apiClient(`/listings/${listingId}`, { method: "GET" }),
  getListingInvestors: ({ listingId, page = 1, limit = 10 }) =>
    apiClient(`/listings/${listingId}/investors?page=${page}&limit=${limit}`, { method: "GET" }),
  getActiveInvestments: () =>
    apiClient(`/investments/farmer/my-investments`, { method: "GET" }),
  getVerificationStatus: () =>
    apiClient("/farmer-verifications/me", { method: "GET" }),
  getListingUpdates: ({ listingId, page = 1, limit = 10 }) =>
    apiClient(`/listings/${listingId}/updates?page=${page}&limit=${limit}`, {
      method: "GET",
    }),
  getListingReviews: ({ listingId, page = 1, limit = 10 }) =>
    apiClient(`/listings/${listingId}/reviews?page=${page}&limit=${limit}`, {
      method: "GET",
    }),

  submitVerification: (data) =>
    apiClient("/farmer-verifications/submit", { method: "POST", body: data }),
  createAsset: (data) => apiClient("/assets", { method: "POST", body: data }),
  createListing: ({ assetId, data }) =>
    apiClient(`/listings/${assetId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  triggerDistribution: (data) =>
    apiClient("/distributions", { method: "POST", body: JSON.stringify(data) }),
  createListingUpdate: ({ listingId, data }) =>
    apiClient(`/listings/${listingId}/updates`, {
      method: "POST",
      body: data,
    }),
  editListingUpdate: ({ listingId, updateId, data }) =>
    apiClient(`/listings/${listingId}/updates/${updateId}`, {
      method: "PATCH",
      body: data,
    }),
  deleteListingUpdate: ({ listingId, updateId }) =>
    apiClient(`/listings/${listingId}/updates/${updateId}`, {
      method: "DELETE",
    }),
});
