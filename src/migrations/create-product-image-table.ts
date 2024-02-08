'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProductImage', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            imageData: {
                type: Sequelize.BLOB,
                allowNull: false
            }
        });
    }
};
