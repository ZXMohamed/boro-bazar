import UserService from './user.service.js';

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await this.userService.updateUser(id, userData);
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await this.userService.deleteUser(id);
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}
