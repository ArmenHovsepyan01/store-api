'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Colors',
      [
        { color: 'Red', createdAt: new Date(), updatedAt: new Date() },
        { color: 'Green', createdAt: new Date(), updatedAt: new Date() },
        { color: 'Blue', createdAt: new Date(), updatedAt: new Date() }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
