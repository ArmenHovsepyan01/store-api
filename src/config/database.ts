import {Sequelize} from "sequelize";

const sequelize = new Sequelize(
    'users',
    'root',
    'PassWord$12',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

export const connectToDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.')
    } catch (e) {
        throw new Error(e);
    }
};

export default sequelize;