import { CallParticipants } from '../db/models/call_participants.model.js';
class CallParticipantsService {
    constructor() { }
    async create(data) {
        try {
            const participant = await CallParticipants.create(data);
            return participant;
        }
        catch (error) {
            throw new Error('Error adding participant: ' + error.message);
        }
    }
    async find() {
        try {
            const participants = await CallParticipants.findAll();
            return participants;
        }
        catch (error) {
            throw new Error('Error finding participants: ' + error.message);
        }
    }
    async findByCall(callId) {
        try {
            const participants = await CallParticipants.findAll({
                where: { call_id: callId }
            });
            return participants;
        }
        catch (error) {
            throw new Error('Error finding participants for call: ' + error.message);
        }
    }
    async update(id, changes) {
        try {
            const [updated] = await CallParticipants.update(changes, {
                where: { id },
            });
            if (updated === 1) {
                return { success: true };
            }
            else {
                return { error: 'Participant not found or no changes applied' };
            }
        }
        catch (error) {
            throw new Error('Error updating participant: ' + error.message);
        }
    }
    async delete(id) {
        try {
            const deleted = await CallParticipants.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            }
            else {
                return { error: 'Participant not found' };
            }
        }
        catch (error) {
            throw new Error('Error removing participant: ' + error.message);
        }
    }
}
export default CallParticipantsService;
