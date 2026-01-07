import { Model, DataTypes, Sequelize } from "sequelize";
import { CALLS_TABLE } from "./calls.model.js";
import { USERS_TABLE } from "./users.model.js";

const CALL_PARTICIPANTS_TABLE = "call_participants";

const CallParticipantsSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    call_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: CALLS_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USERS_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    role: {
        type: DataTypes.STRING, // 'Host', 'Guest'
        allowNull: false,
        defaultValue: "Guest",
    },
    joined_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    left_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};

class CallParticipants extends Model {
    static associate(models) {
        this.belongsTo(models.Calls, { foreignKey: "call_id", as: "call" });
        this.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CALL_PARTICIPANTS_TABLE,
            modelName: "CallParticipants",
            timestamps: false,
        };
    }
}

export { CALL_PARTICIPANTS_TABLE, CallParticipantsSchema, CallParticipants };
