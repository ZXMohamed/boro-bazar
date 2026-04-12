import { AuthState } from "@/types/auth";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * Auth Store
 * Handles user authentication state and tokens
 * Persists to localStorage with selective storage
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        user: null,
        token: null,
        refreshToken: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,

        // Actions
        setUser: (user) =>
          set({ user, isAuthenticated: !!user }, false, "setUser"),

        setToken: (token) => set({ token }, false, "setToken"),

        setRefreshToken: (refreshToken) =>
          set({ refreshToken }, false, "setRefreshToken"),

        setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

        setError: (error) => set({ error }, false, "setError"),

        /**
         * Set complete auth state at once
         * Used after successful login/register
         */
        setAuth: (user, token, refreshToken) =>
          set(
            {
              user,
              token,
              refreshToken: refreshToken || null,
              isAuthenticated: true,
              error: null,
            },
            false,
            "setAuth",
          ),

        /**
         * Logout and clear all auth state
         */
        logout: () =>
          set(
            {
              user: null,
              token: null,
              refreshToken: null,
              isAuthenticated: false,
              error: null,
            },
            false,
            "logout",
          ),

        /**
         * Clear error message
         */
        clearError: () => set({ error: null }, false, "clearError"),

        /**
         * Update partial user data
         * Used when user updates profile
         */
        updateUser: (userData) =>
          set(
            (state) => ({
              user: state.user ? { ...state.user, ...userData } : null,
            }),
            false,
            "updateUser",
          ),
      }),
      {
        name: "auth-storage", // localStorage key
        partialize: (state) => ({
          // Only persist these fields
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
        // Optional: Custom storage implementation
        // storage: createJSONStorage(() => sessionStorage),
      },
    ),
    {
      name: "AuthStore", // DevTools name
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

/**
 * Selectors for better performance
 * Use these to subscribe to specific parts of state
 */
export const selectUser = (state: AuthState) => state.user;
export const selectToken = (state: AuthState) => state.token;
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectError = (state: AuthState) => state.error;
