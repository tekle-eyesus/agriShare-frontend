import { create } from "zustand";
import { authApi } from "../api/auth";
import { commonApi } from "../api/common";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_URL;

//TODO: we have to rethrow errors in the catch
export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  isSigningUp: false,
  isloggingin: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  checkAuth: async () => {
    try {
      const res = await authApi().getAuthenticatedUser();
      set({ authUser: res?.data?.user });
      // get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await authApi().signup(data);
    } catch (error) {
      toast.error(error.message);
      throw new Error(error.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isloggingin: true });
    try {
      const res = await authApi().login(data);
      set({ authUser: res?.data?.user });
      // get().connectSocket();
    } catch (error) {
      toast.error(error.message);
      let newError = new Error(error.message);
      newError.email = data.email;
      throw newError;
    } finally {
      set({ isloggingin: false });
    }
  },
  logout: async () => {
    try {
      await authApi().logout();
      set({ authUser: null });
      window.location.assign("/login");
      // get().disconnectSocket();
    } catch (error) {
      toast.error(error.message);
    }
  },
  verifyEmail: async (data) => {
    try {
      const res = await authApi().verifyEmail(data);
      set({ authUser: res?.data?.user });
      return res;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  },
  resendOTP: async (data) => {
    try {
      const res = await authApi().resendOTP(data);
      return res;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await commonApi().updateProfile(data);
      set({ authUser: res?.data?.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
      throw new Error("Error in updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(API_BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }));
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
