import { verifyToken } from "../auth/tokens.js";
import User from "../auth/user.model.js";
import { AppError, catchAsync } from "../auth/errors.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("No token provided", 401, "NO_TOKEN");
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError("User not found", 401, "USER_NOT_FOUND");
    }

    if (user.isLocked) {
      throw new AppError("Account is locked", 423, "ACCOUNT_LOCKED");
    }

    req.user = { id: user._id, email: user.email, role: user.role };
    next();
  } catch (error) {
    if (error instanceof AppError) throw error;

    if (error.name === "TokenExpiredError") {
      throw new AppError("Token expired", 401, "TOKEN_EXPIRED");
    }
    throw new AppError("Invalid token", 401, "INVALID_TOKEN");
  }
});

export const admin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    throw new AppError("Admin access required", 403, "ADMIN_REQUIRED");
  }
  next();
};