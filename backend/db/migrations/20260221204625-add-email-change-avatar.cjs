'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add email column
    await queryInterface.addColumn('users', 'email', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'temporal@example.com', // Needed if we have existing users, else it will crash
    });

    // We can then re-add the strict constraints assuming existing values have been addressed
    await queryInterface.changeColumn('users', 'email', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });

    // 2. Change avatar column type to TEXT to allow base64 strings
    await queryInterface.changeColumn('users', 'avatar', {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'email');
    await queryInterface.changeColumn('users', 'avatar', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  }
};
