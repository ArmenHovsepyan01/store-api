'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      { category: 'clothes', createdAt: new Date(), updatedAt: new Date() },
      { category: 'shoes', createdAt: new Date(), updatedAt: new Date() },
      { category: 'electronics', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
