import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "./user.model.js";


/**
 * Generate a JWT for a user
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

/**
 * Common user data response format
 */
const formatUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id),
});

/**
 * Register user business logic
 */
export const registerUser = async ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ name, email, password });
  if (error) throw new Error(error.details[0].message);

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const newUser = await User.create({ name, email, password });

  return formatUserResponse(newUser);
};

/**
 * Login user business logic
 */
export const loginUser = async ({ email, password }) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) throw new Error(error.details[0].message);

  const user = await User.findOne({ email });
  const isPasswordMatch = user && (await user.comparePassword(password));

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  return formatUserResponse(user);
};


