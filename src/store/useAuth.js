import { create } from "zustand";
import { authApi } from "../api/auth";
import { commonApi } from "../api/common";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
      set({ authUser: res });
      get().connectSocket();
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
      const res = await authApi().register(data);
      set({ authUser: res });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isloggingin: true });
    try {
      const res = await authApi().login(data);
      set({ authUser: res });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isloggingin: false });
    }
  },
  logout: async () => {
    try {
      await authApi().logout();
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.message);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await commonApi().updateProfile(data);
      set({ authUser: res });
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
