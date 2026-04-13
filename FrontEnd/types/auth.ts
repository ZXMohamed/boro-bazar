import { UserT } from "./user";

export interface LoginPayloadT {
  email: string;
  password: string;
}

export interface LoginResponseT {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface RegisterPayloadT {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface RegisterResponseT {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface VerifyOtpPayloadT {
  email: string;
  otp: string;
}

export interface VerifyOtpResponseT {
  verified: boolean;
  message: string;
}

export interface AuthState {
  // State
  user: UserT | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: UserT | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setAuth: (user: UserT, token: string, refreshToken?: string) => void;
  logout: () => void;
  clearError: () => void;
  updateUser: (user: Partial<UserT>) => void;
}
