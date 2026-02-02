import { sequelize } from '../db/config.js';

const models = sequelize.models;

class CallsService {
    constructor() { }

    async create(data) {
        try {
            const call = await models.Calls.create(data);
            return call;
        } catch (error) {
            throw new Error('Error creating call: ' + error.message);
        }
    }

    async find() {
        try {
            const calls = await models.Calls.findAll();
            return calls;
        } catch (error) {
            throw new Error('Error finding calls: ' + error.message);
        }
    }

    async findOne(id) {
        try {
            const call = await models.Calls.findByPk(id);
            if (!call) {
                throw new Error('Call not found');
            }
            return call;
        } catch (error) {
            throw new Error('Error finding call: ' + error.message);
        }
    }

    async findActive() {
        try {
            const calls = await models.Calls.findAll({
                where: { is_active: true }
            });
            return calls;
        } catch (error) {
            throw new Error('Error finding active calls: ' + error.message);
        }
    }

    async update(id, changes) {
        try {
            const [updated] = await models.Calls.update(changes, {
                where: { id },
            });
            if (updated === 1) {
                return { success: true };
            } else {
                return { error: 'Call not found or no changes applied' };
            }
        } catch (error) {
            throw new Error('Error updating call: ' + error.message);
        }
    }

    async delete(id) {
        try {
            // Physical delete as per plan
            const deleted = await models.Calls.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            } else {
                return { error: 'Call not found' };
            }
        } catch (error) {
            throw new Error('Error deleting call: ' + error.message);
        }
    }
}

export default CallsService;
