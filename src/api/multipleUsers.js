import { apiClient } from "./client";

export const multipleUsersApi = () => ({
  getAssets: () => apiClient("/assets/my-assets", { method: "GET" }),
  getAsset: (assetId) => apiClient(`/assets/${assetId}`, { method: "GET" }),
  getListings: () => apiClient("/listings/my-listings", { method: "GET" }),
  getActiveListings: () => apiClient("/listings/active", { method: "GET" }),
  getListing: (listingId) =>
    apiClient(`/listings/${listingId}`, { method: "GET" }),
  getListingUpdates: ({ listingId, page = 1, limit = 10 }) =>
    apiClient(`/listings/${listingId}/updates?page=${page}&limit=${limit}`, {
      method: "GET",
    }),
  getListingReviews: ({ listingId, page = 1, limit = 10 }) =>
    apiClient(`/listings/${listingId}/reviews?page=${page}&limit=${limit}`, {
      method: "GET",
    }),
});
