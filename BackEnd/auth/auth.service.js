import User from "./user.model.js";
import { generateTokens } from "./tokens.js";
import { authenticateWithGoogle } from "./googleAuthService.js";
import { sendEmail } from "../email/emailService.js";
import {
  AppError,
  AuthenticationError,
  ConflictError,
  NotFoundError,
} from "./errors.js";

const sanitizeUser = (user) => {
  return user.toJSON();
};

const sendVerificationEmail = async (user, otp) => {
  await sendEmail({
    to: user.email,
    subject: "Boro Bazar - Verify Your Email",
    html: `
      <h2>Welcome to Boro Bazar!</h2>
      <p>Hello ${user.name},</p>
      <p>Please verify your email using the following OTP code:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px;">${otp}</p>
      <p>This code expires in 10 minutes.</p>
    `,
  });
};

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser?.authProvider === "google") {
    throw new ConflictError("Email already registered with Google");
  }
  if (existingUser) {
    throw new ConflictError("Email already registered");
  }

  const user = await User.create({ name, email, password, authProvider: "local" });
  
  const otp = user.generateOTP();
  await user.save();
  
  await sendVerificationEmail(user, otp);

  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return { ...sanitizeUser(user), ...tokens };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError("Invalid email or password");
  }

  if (user.authProvider === "google") {
    throw new AuthenticationError("Please login with Google");
  }

  if (!user.password) {
    throw new AuthenticationError("Invalid email or password");
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw new AuthenticationError("Invalid email or password");
  }

  user.lastLogin = new Date();
  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return { ...sanitizeUser(user), ...tokens };
};

export const refreshTokens = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new AppError("Refresh token required", 400, "TOKEN_REQUIRED");
  }

  const user = await User.findByRefreshToken(refreshToken);

  if (!user) {
    throw new AuthenticationError("Invalid refresh token");
  }

  const tokens = generateTokens(user);
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return tokens;
};

export const logout = async (userId) => {
  await User.clearRefreshToken(userId);
};

export const googleLogin = async ({ idToken }) => {
  return await authenticateWithGoogle(idToken);
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");
  return sanitizeUser(user);
};

export const changePassword = async (userId, { currentPassword, password }) => {
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError("User not found");

  if (user.authProvider === "google") {
    throw new AppError("Cannot change password for Google accounts", 400, "OAUTH_ACCOUNT");
  }

  const isValid = await user.comparePassword(currentPassword);
  if (!isValid) {
    throw new AuthenticationError("Current password is incorrect");
  }

  user.password = password;
  user.refreshToken = null;
  await user.save();

  return { message: "Password changed successfully" };
};