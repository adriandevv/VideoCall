import { Messages } from '../db/models/messages.model.js';
class MessagesService {
    constructor() { }
    async create(data) {
        try {
            const message = await Messages.create(data);
            return message;
        }
        catch (error) {
            throw new Error('Error creating message: ' + error.message);
        }
    }
    async find() {
        try {
            const messages = await Messages.findAll();
            return messages;
        }
        catch (error) {
            throw new Error('Error finding messages: ' + error.message);
        }
    }
    async findByCall(callId) {
        try {
            const messages = await Messages.findAll({
                where: { call_id: callId },
                order: [['created_at', 'ASC']]
            });
            return messages;
        }
        catch (error) {
            throw new Error('Error finding messages for call: ' + error.message);
        }
    }
    async delete(id) {
        try {
            const deleted = await Messages.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            }
            else {
                return { error: 'Message not found' };
            }
        }
        catch (error) {
            throw new Error('Error deleting message: ' + error.message);
        }
    }
}
export default MessagesService;
