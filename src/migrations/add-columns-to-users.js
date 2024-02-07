'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn('Users', 'isVerified', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('Users', 'newColumn1');
    // await queryInterface.removeColumn('Users', 'newColumn2');
    // Remove other columns added in the up function
  }
};
