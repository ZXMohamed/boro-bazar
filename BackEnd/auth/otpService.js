import User from "./user.model.js";
import { sendEmail } from "../email/emailService.js";
import { AppError } from "./errors.js";

const sendOtpEmail = async (user, otp) => {
  await sendEmail({
    to: user.email,
    subject: "Boro Bazar - Password Reset",
    html: `
      <h2>Password Reset</h2>
      <p>Hello ${user.name},</p>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code expires in 10 minutes.</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};

export const requestReset = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { message: "If an account exists, an OTP has been sent" };
  }

  if (user.authProvider === "google") {
    throw new AppError("Google accounts cannot reset password", 400, "GOOGLE_ACCOUNT");
  }

  const otp = user.generateOTP();
  await user.save();
  await sendOtpEmail(user, otp);

  return { message: "If an account exists, an OTP has been sent" };
};

export const verifyOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user?.otp?.code) {
    throw new AppError("No OTP requested", 400, "NO_OTP");
  }

  if (user.otp.attempts >= 5) {
    user.clearOTP();
    await user.save();
    throw new AppError("Too many failed attempts. Request a new OTP", 400, "TOO_MANY_ATTEMPTS");
  }

  if (user.otp.expiresAt < new Date()) {
    throw new AppError("OTP expired. Request a new one", 400, "OTP_EXPIRED");
  }

  if (user.otp.code !== otp) {
    user.otp.attempts += 1;
    await user.save();
    throw new AppError("Invalid OTP", 400, "INVALID_OTP");
  }

  return { message: "OTP verified" };
};

export const verifyEmail = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) throw new AppError("User not found", 404);
  if (user.isVerified) return { message: "Email already verified" };

  if (!user.otp?.code) {
    throw new AppError("No verification code found", 400);
  }

  if (user.otp.expiresAt < new Date()) {
    throw new AppError("Code expired", 400);
  }

  if (user.otp.code !== otp) {
    user.otp.attempts += 1;
    await user.save();
    throw new AppError("Invalid code", 400);
  }

  user.isVerified = true;
  user.clearOTP();
  await user.save();

  return { message: "Email verified successfully" };
};

export const reset = async ({ email, otp, password }) => {
  const user = await User.findOne({ email });

  if (!user?.otp?.code) {
    throw new AppError("Invalid request", 400, "INVALID_REQUEST");
  }

  if (user.otp.expiresAt < new Date()) {
    throw new AppError("OTP expired. Request a new one", 400, "OTP_EXPIRED");
  }

  if (user.otp.code !== otp) {
    throw new AppError("Invalid OTP", 400, "INVALID_OTP");
  }

  user.password = password;
  user.clearOTP();
  user.refreshToken = null;
  await user.save();

  return { message: "Password reset successfully" };
};