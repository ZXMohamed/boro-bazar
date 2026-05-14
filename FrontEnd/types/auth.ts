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
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: UserT | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setAuth: (user: UserT) => void;
  logout: () => void;
  clearError: () => void;
  updateUser: (user: Partial<UserT>) => void;
}
