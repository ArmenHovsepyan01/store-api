'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Categories', 'parent_id', {
      type: Sequelize.INTEGER,

      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Categories', 'parent_id');
  }
};
