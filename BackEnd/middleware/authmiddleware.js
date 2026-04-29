import jwt from "jsonwebtoken";
import User from "../User/user.schema.js";
// to check if user is logged in and to protect routes
export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            if (req.headers.authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
            } else {
                token = req.headers.authorization;
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

            // Get user from the token
            //send user data to req.user except password
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
export const user = (req, res, next) => {
    if (req.user && req.user.role === "user") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized" });
    }
};
export const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};