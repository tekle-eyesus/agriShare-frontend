const API_BASE_URL = import.meta.env.VITE_API_URL;
import {
  ApiRequestError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../utils/errors";

export const apiClient = async (endpoint, options = {}) => {
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (error) {
    throw new NetworkError("Failed to reach server. Please try again.", error);
  }

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = {};
    }
    const message =
      errorData.message || "An error occurred while fetching data.";
    if (response.status === 401 || response.status === 403) {
      throw new UnauthorizedError(message, errorData);
    }
    if (response.status === 404) {
      throw new NotFoundError(message, errorData);
    }
    if (response.status === 400 || response.status === 422) {
      throw new ValidationError(message, errorData);
    }
    throw new ApiRequestError(message, response.status, errorData);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};
