import { Users } from '../db/models/users.model.js';
class UsersService {
    constructor() { }
    async create(data) {
        try {
            const user = await Users.create(data);
            return user;
        }
        catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }
    async find() {
        try {
            const users = await Users.findAll();
            return users;
        }
        catch (error) {
            throw new Error('Error finding users: ' + error.message);
        }
    }
    async findOne(id) {
        try {
            const user = await Users.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    }
    async findByUsername(username) {
        try {
            const user = await Users.findOne({
                where: { username }
            });
            return user;
        }
        catch (error) {
            throw new Error('Error finding user by username: ' + error.message);
        }
    }
    async update(id, changes) {
        try {
            const [updated] = await Users.update(changes, {
                where: { id },
            });
            if (updated === 1) {
                return { success: true };
            }
            else {
                return { error: 'User not found or no changes applied' };
            }
        }
        catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }
    async delete(id) {
        try {
            const deleted = await Users.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            }
            else {
                return { error: 'User not found' };
            }
        }
        catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}
export default UsersService;
