import { sequelize } from '../db/config.js';

const models = sequelize.models;

class CallParticipantsService {
    constructor() { }

    async create(data) {
        try {
            const participant = await models.CallParticipants.create(data);
            return participant;
        } catch (error) {
            throw new Error('Error adding participant: ' + error.message);
        }
    }

    async find() {
        try {
            const participants = await models.CallParticipants.findAll();
            return participants;
        } catch (error) {
            throw new Error('Error finding participants: ' + error.message);
        }
    }

    async findByCall(callId) {
        try {
            const participants = await models.CallParticipants.findAll({
                where: { call_id: callId }
            });
            return participants;
        } catch (error) {
            throw new Error('Error finding participants for call: ' + error.message);
        }
    }

    async update(id, changes) {
        try {
            const [updated] = await models.CallParticipants.update(changes, {
                where: { id },
            });
            if (updated === 1) {
                return { success: true };
            } else {
                return { error: 'Participant not found or no changes applied' };
            }
        } catch (error) {
            throw new Error('Error updating participant: ' + error.message);
        }
    }

    async delete(id) {
        try {
            const deleted = await models.CallParticipants.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            } else {
                return { error: 'Participant not found' };
            }
        } catch (error) {
            throw new Error('Error removing participant: ' + error.message);
        }
    }
}

export default CallParticipantsService;
