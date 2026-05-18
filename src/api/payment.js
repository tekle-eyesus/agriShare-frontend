import { apiClient } from "./client";

export const paymentApi = () => ({
  getPaymentHistory: ({ page = 1, limit = 10, status = "all", type = "all" }) =>
    apiClient(`/payments/me/transactions?page=${page}&limit=${limit}&type=${type}&status=${status}`, {
      method: "GET",
    }),
  getPaymentHistoryForAdmin: ({ page = 1, limit = 10, status = "all", type = "all" }) =>
    apiClient(`/payments/admin/transactions?page=${page}&limit=${limit}&type=${type}&status=${status}`, {
      method: "GET",
    }),
  verifyDeposite: (txRef) =>
    apiClient(`/payments/deposits/verify/${txRef}`, {
      method: "GET",
    }),
  initiateDeposite: (data) =>
    apiClient("/payments/deposits/initiate", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  requestWithdrawal: (data) =>
    apiClient(`/payments/withdrawals/request`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
    
});
