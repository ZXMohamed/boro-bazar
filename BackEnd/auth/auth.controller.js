import * as authService from "./auth.service.js";
import * as otpService from "./otpService.js";
import { catchAsync, sendSuccess } from "./errors.js";

const sendTokenResponse = (res, userWithTokens, message, statusCode = 200) => {
  const { accessToken, refreshToken, ...user } = userWithTokens;

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendSuccess(res, { user, accessToken }, message, statusCode);
};

export const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  sendTokenResponse(res, result, "Registration successful. Please verify your email.", 201);
});

export const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  sendTokenResponse(res, result, "Login successful");
});

export const refreshTokens = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  const tokens = await authService.refreshTokens({ refreshToken });
  
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  
  sendSuccess(res, { accessToken: tokens.accessToken }, "Tokens refreshed");
});

export const logout = catchAsync(async (req, res) => {
  await authService.logout(req.user.id);
  
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendSuccess(res, null, "Logged out successfully");
});

export const verifyEmail = catchAsync(async (req, res) => {
  const result = await otpService.verifyEmail(req.body);
  sendSuccess(res, result);
});

export const googleAuth = catchAsync(async (req, res) => {
  const result = await authService.googleLogin(req.body);
  sendTokenResponse(res, result, "Google authentication successful");
});

export const getProfile = catchAsync(async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  sendSuccess(res, user);
});

export const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.user.id, req.body);
  sendSuccess(res, result);
});

export const forgotPassword = catchAsync(async (req, res) => {
  const result = await otpService.requestReset(req.body);
  sendSuccess(res, result);
});

export const verifyOtp = catchAsync(async (req, res) => {
  const result = await otpService.verifyOtp(req.body);
  sendSuccess(res, result);
});

export const resetPassword = catchAsync(async (req, res) => {
  const result = await otpService.reset(req.body);
  sendSuccess(res, result);
});