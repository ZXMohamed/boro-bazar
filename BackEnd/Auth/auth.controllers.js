import * as authService from "./auth.service.js";

/**
 * Handle User Registration
 */
export const signUp = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Handle User Login
 */
export const login = async (req, res, next) => {
    try {
        const user = await authService.loginUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};