'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('calls', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            started_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
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
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('calls');
    },
};
