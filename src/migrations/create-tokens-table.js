'use strict'

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable("tokens", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onUpdate: "cascade",
                onDelete: "cascade",
                references: { model: "users", key: "id" }
            },
            token: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        })
    }
}