import { sequelize } from '../db/config.js';
import { CallParticipants } from '../db/models/call_participants.model.js';

class CallParticipantsService {
    constructor() { }

    async create(data: any) {
        try {
            const participant = await CallParticipants.create(data);
            return participant;
        } catch (error: any) {
            throw new Error('Error adding participant: ' + error.message);
        }
    }

    async find() {
        try {
            const participants = await CallParticipants.findAll();
            return participants;
        } catch (error: any) {
            throw new Error('Error finding participants: ' + error.message);
        }
    }

    async findByCall(callId: string) {
        try {
            const participants = await CallParticipants.findAll({
                where: { call_id: callId }
            });
            return participants;
        } catch (error: any) {
            throw new Error('Error finding participants for call: ' + error.message);
        }
    }

    async update(id: number, changes: any) {
        try {
            const [updated] = await CallParticipants.update(changes, {
                where: { id },
            });
            if (updated === 1) {
                return { success: true };
            } else {
                return { error: 'Participant not found or no changes applied' };
            }
        } catch (error: any) {
            throw new Error('Error updating participant: ' + error.message);
        }
    }

    async delete(id: number) {
        try {
            const deleted = await CallParticipants.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            } else {
                return { error: 'Participant not found' };
            }
        } catch (error: any) {
            throw new Error('Error removing participant: ' + error.message);
        }
    }
}

export default CallParticipantsService;
