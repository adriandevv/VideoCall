'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('messages', {
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
                    model: 'calls',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            sender_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'text',
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('messages');
    },
};
