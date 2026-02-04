import { Sequelize } from 'sequelize';
import { Users, UsersSchema } from './users.model.js';
import { Calls, CallsSchema } from './calls.model.js';
import { CallParticipants, CallParticipantsSchema } from './call_participants.model.js';
import { Messages, MessagesSchema } from './messages.model.js';

function setupModels(sequelize: Sequelize) {
    Users.init(UsersSchema, Users.config(sequelize));
    Calls.init(CallsSchema, Calls.config(sequelize));
    CallParticipants.init(CallParticipantsSchema, CallParticipants.config(sequelize));
    Messages.init(MessagesSchema, Messages.config(sequelize));

    Users.associate(sequelize.models);
    Calls.associate(sequelize.models);
    CallParticipants.associate(sequelize.models);
    Messages.associate(sequelize.models);
}

export default setupModels;
