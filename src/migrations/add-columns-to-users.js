'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    // await queryInterface.addColumn('Users', 'registration_timestamp', {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.literal("NOW()")
    // });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('Users', 'newColumn1');
    // await queryInterface.removeColumn('Users', 'newColumn2');
    // Remove other columns added in the up function
  }
};
