import { Router } from 'express';
import UserController from './user.controller.js';

export const userRouter = Router();
const userController = new UserController();

// Get all users
userRouter.get('/', userController.getAllUsers.bind(userController));

// Get user by ID
userRouter.get('/:id', userController.getUserById.bind(userController));

// Create new user
userRouter.post('/', userController.createUser.bind(userController));

// Update user
userRouter.put('/:id', userController.updateUser.bind(userController));

// Delete user
userRouter.delete('/:id', userController.deleteUser.bind(userController));

// update user password
userRouter.put('/password/:id', userController.updateUserPassword.bind(userController));
