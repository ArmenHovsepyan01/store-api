'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        category: 'clothes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        category: 'shirts',
        parent_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        category: 'hoodies',
        parent_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        category: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        category: 'phones',
        parent_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        category: 'laptops',
        parent_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        category: "tv's",
        parent_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        category: "pc's",
        parent_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        category: 'shoes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        category: 'trainers',
        parent_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        category: 'boots',
        parent_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
