import User from './user.schema.js';

export default class UserService {
    constructor() {
        this.user = User;
    }

    async getAllUsers() {
        try {
            const users = await this.user.find().select('-password');
            return users;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await this.user.findById(id).select('-password');
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    async createUser(userData) {
        try {
            const newUser = await this.user.create(userData);
            return newUser;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async updateUser(id, userData) {
        try {
            const updatedUser = await this.user.findByIdAndUpdate(
                id,
                { ...userData, updatedAt: Date.now() },
                { new: true }
            ).select('-password');
            if (!updatedUser) throw new Error('User not found');
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUser(id) {
        try {
            const deletedUser = await this.user.findByIdAndDelete(id);
            if (!deletedUser) throw new Error('User not found');
            return { message: 'User deleted successfully', user: deletedUser };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.user.findOne({ email });
            return user;
        } catch (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }
    }
}
