'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('call_participants', {
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
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Guest',
            },
            joined_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
            left_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('call_participants');
    },
};
