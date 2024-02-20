'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Colors', [
      { color: 'Orange', createdAt: new Date(), updatedAt: new Date() },
      { color: 'Black', createdAt: new Date(), updatedAt: new Date() },
      { color: 'Yellow', createdAt: new Date(), updatedAt: new Date() },
      { color: 'Indigo', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
