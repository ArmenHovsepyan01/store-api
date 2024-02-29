'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'user'
    });

    await queryInterface.addConstraint('Users', {
      fields: ['role'],
      type: 'check',
      where: {
        role: ['admin', 'user']
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'role');
  }
};
