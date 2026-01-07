import { Model, DataTypes, Sequelize } from "sequelize";

const USERS_TABLE = "users";

const UsersSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
};

class Users extends Model {
    static associate(models) {
        this.hasMany(models.CallParticipants, {
            foreignKey: "user_id",
            as: "participations",
        });
        this.hasMany(models.Messages, {
            foreignKey: "sender_id",
            as: "messages",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USERS_TABLE,
            modelName: "Users",
            timestamps: false,
        };
    }
}

export { USERS_TABLE, UsersSchema, Users };
