'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.insert('Categories', {
      category: 'clothes',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
