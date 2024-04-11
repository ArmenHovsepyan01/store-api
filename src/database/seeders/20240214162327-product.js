'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'T-shirt',
        description: 'Comfortable cotton T-shirt',
        brand: 'Polo',
        price: 200,
        main_img: 'images/shirt.webp',
        user_id: 36,
        category_id: 193,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jacket',
        description: 'Stylish jacket for any occasion',
        brand: 'Adidas',
        price: 150,
        main_img: 'images/jacket.webp',
        user_id: 36,
        category_id: 193,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jeans',
        description: 'Classic blue jeans',
        brand: "Levi's",
        price: 100,
        main_img: 'images/jeans.webp',
        user_id: 36,
        category_id: 193,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hoodie',
        description: 'Cozy hoodie for chilly days',
        brand: 'Nike',
        price: 80,
        main_img: 'images/hoodie.jpg',
        user_id: 36,
        category_id: 193,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sneakers',
        description: 'Stylish and comfortable sneakers',
        brand: 'Converse',
        price: 120,
        main_img: 'images/sneakers.webp',
        user_id: 36,
        category_id: 193,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shorts',
        description: 'Casual shorts for warm weather',
        brand: 'Gap',
        price: 60,
        main_img: 'images/shorts.webp',
        user_id: 36,
        category_id: 193,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coat',
        description: 'Warm coat for winter',
        brand: 'The North Face',
        price: 300,
        main_img: 'images/coat.jpg',
        user_id: 36,
        category_id: 193,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
