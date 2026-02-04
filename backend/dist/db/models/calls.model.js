import { Model, DataTypes } from "sequelize";
const CALLS_TABLE = "calls";
const CallsSchema = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    started_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    ended_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
};
class Calls extends Model {
    static associate(models) {
        this.hasMany(models.CallParticipants, {
            foreignKey: "call_id",
            as: "participants",
        });
        this.hasMany(models.Messages, {
            foreignKey: "call_id",
            as: "messages",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CALLS_TABLE,
            modelName: "Calls",
            timestamps: false,
        };
    }
}
export { CALLS_TABLE, CallsSchema, Calls };
