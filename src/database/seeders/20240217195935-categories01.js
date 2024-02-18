'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.insert('Categories', {
      category: 'clothes',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};

// [
//   { category: 'clothes', createdAt: new Date(), updatedAt: new Date() },
//   { category: 'shoes', createdAt: new Date(), updatedAt: new Date() },
//   { category: 'electronics', createdAt: new Date(), updatedAt: new Date() }
// ]
