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
  getListingInvestors: (listingId) =>
    apiClient(`/listings/${listingId}/investors`, { method: "GET" }),
  getActiveInvestments: () =>
    apiClient(`/investments/farmer/my-investments`, { method: "GET" }),

  createAsset: (data) =>
    apiClient("/assets", { method: "POST", body: JSON.stringify(data) }),
  listAsset: (data) =>
    apiClient("/listings", { method: "POST", body: JSON.stringify(data) }),

  triggerDistribution: (data) =>
    apiClient("/distributions", { method: "POST", body: JSON.stringify(data) }),
});
