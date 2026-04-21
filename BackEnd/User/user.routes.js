import { Router } from 'express';
import UserController from './user.controller.js';

export const userRouter = Router();
const userController = new UserController();

// Get all users
userRouter.get('/users', userController.getAllUsers.bind(userController));

// Get user by ID
userRouter.get('/users/:id', userController.getUserById.bind(userController));

// Create new user
userRouter.post('/users', userController.createUser.bind(userController));

// Update user
userRouter.put('/users/:id', userController.updateUser.bind(userController));

// Delete user
userRouter.delete('/users/:id', userController.deleteUser.bind(userController));
