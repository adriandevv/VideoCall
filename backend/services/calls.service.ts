import { sequelize } from '../db/config.js';
import { Calls } from '../db/models/calls.model.js';

class CallsService {
    constructor() { }

    async create(data: any) {
        try {
            const call = await Calls.create(data);
            return call;
        } catch (error: any) {
            throw new Error('Error creating call: ' + error.message);
        }
    }

    async find() {
        try {
            const calls = await Calls.findAll();
            return calls;
        } catch (error: any) {
            throw new Error('Error finding calls: ' + error.message);
        }
    }

    async findOne(id: string) {
        try {
            const call = await Calls.findByPk(id);
            if (!call) {
                throw new Error('Call not found');
            }
            return call;
        } catch (error: any) {
            throw new Error('Error finding call: ' + error.message);
        }
    }

    async findActive() {
        try {
            const calls = await Calls.findAll({
                where: { is_active: true }
            });
            return calls;
        } catch (error: any) {
            throw new Error('Error finding active calls: ' + error.message);
        }
    }

    async update(id: string, changes: any) {
        try {
            const [updated] = await Calls.update(changes, {
                where: { id },
            });
            if (updated === 1) {
                return { success: true };
            } else {
                return { error: 'Call not found or no changes applied' };
            }
        } catch (error: any) {
            throw new Error('Error updating call: ' + error.message);
        }
    }

    async delete(id: string) {
        try {
            // Physical delete as per plan
            const deleted = await Calls.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            } else {
                return { error: 'Call not found' };
            }
        } catch (error: any) {
            throw new Error('Error deleting call: ' + error.message);
        }
    }
}

export default CallsService;
