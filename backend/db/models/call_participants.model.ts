import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import { CALLS_TABLE } from "./calls.model.js";
import { USERS_TABLE } from "./users.model.js";
import { Calls } from "./calls.model.js";
import { Users } from "./users.model.js";

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
        defaultValue: DataTypes.NOW,
    },
    left_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};

class CallParticipants extends Model<InferAttributes<CallParticipants>, InferCreationAttributes<CallParticipants>> {
    declare id: CreationOptional<number>;
    declare call_id: ForeignKey<string>;
    declare user_id: ForeignKey<number>;
    declare role: string;
    declare joined_at: CreationOptional<Date>;
    declare left_at: Date | null;

    static associate(models: any) {
        this.belongsTo(models.Calls, { foreignKey: "call_id", as: "call" });
        this.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
    }

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: CALL_PARTICIPANTS_TABLE,
            modelName: "CallParticipants",
            timestamps: false,
        };
    }
}

export { CALL_PARTICIPANTS_TABLE, CallParticipantsSchema, CallParticipants };
