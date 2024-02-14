'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sizes', [
      { size: 'small', createdAt: new Date(), updatedAt: new Date() },
      { size: 'medium', createdAt: new Date(), updatedAt: new Date() },
      { size: 'large', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};
