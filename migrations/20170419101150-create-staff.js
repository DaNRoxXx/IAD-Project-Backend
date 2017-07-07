'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Staffs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userID: {
        allowNull: false,
        type: Sequelize.UUID
      },
      administrator: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Staffs');
  }
};