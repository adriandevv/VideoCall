import { sequelize } from '../db/config.js';

const models = sequelize.models;

class UsersService {
    constructor() { }

    async create(data) {
        try {
            const user = await models.Users.create(data);
            return user;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async find() {
        try {
            const users = await models.Users.findAll();
            return users;
        } catch (error) {
            throw new Error('Error finding users: ' + error.message);
        }
    }

    async findOne(id) {
        try {
            const user = await models.Users.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    }

    async findByUsername(username) {
        try {
            const user = await models.Users.findOne({
                where: { username }
            });
            return user;
        } catch (error) {
            throw new Error('Error finding user by username: ' + error.message);
        }
    }

    async update(id, changes) {
        try {
            const [updated] = await models.Users.update(changes, {
                where: { id },
            });
            if (updated === 1) {
                return { success: true };
            } else {
                return { error: 'User not found or no changes applied' };
            }
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async delete(id) {
        try {
            const deleted = await models.Users.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            } else {
                return { error: 'User not found' };
            }
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

export default UsersService;
