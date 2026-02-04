import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from "sequelize";
import { CALLS_TABLE } from "./calls.model.js";
import { USERS_TABLE } from "./users.model.js";

const MESSAGES_TABLE = "messages";

const MessagesSchema = {
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
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: USERS_TABLE,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "text",
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
};

class Messages extends Model<InferAttributes<Messages>, InferCreationAttributes<Messages>> {
    declare id: CreationOptional<number>;
    declare call_id: ForeignKey<string>;
    declare sender_id: ForeignKey<number>;
    declare content: string;
    declare type: CreationOptional<string>;
    declare created_at: CreationOptional<Date>;

    static associate(models: any) {
        this.belongsTo(models.Calls, { foreignKey: "call_id", as: "call" });
        this.belongsTo(models.Users, { foreignKey: "sender_id", as: "sender" });
    }

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: MESSAGES_TABLE,
            modelName: "Messages",
            timestamps: false,
        };
    }
}

export { MESSAGES_TABLE, MessagesSchema, Messages };
