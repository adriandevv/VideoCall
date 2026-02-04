import { sequelize } from '../db/config.js';
import { Messages } from '../db/models/messages.model.js';

class MessagesService {
    constructor() { }

    async create(data: any) {
        try {
            const message = await Messages.create(data);
            return message;
        } catch (error: any) {
            throw new Error('Error creating message: ' + error.message);
        }
    }

    async find() {
        try {
            const messages = await Messages.findAll();
            return messages;
        } catch (error: any) {
            throw new Error('Error finding messages: ' + error.message);
        }
    }

    async findByCall(callId: string) {
        try {
            const messages = await Messages.findAll({
                where: { call_id: callId },
                order: [['created_at', 'ASC']]
            });
            return messages;
        } catch (error: any) {
            throw new Error('Error finding messages for call: ' + error.message);
        }
    }

    async delete(id: number) {
        try {
            const deleted = await Messages.destroy({
                where: { id },
            });
            if (deleted === 1) {
                return { success: true };
            } else {
                return { error: 'Message not found' };
            }
        } catch (error: any) {
            throw new Error('Error deleting message: ' + error.message);
        }
    }
}

export default MessagesService;
