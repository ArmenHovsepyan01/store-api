// import { Sequelize } from 'sequelize';
//
// const sequelize = new Sequelize('amazon', 'root', 'PassWord$12', {
//   host: 'localhost',
//   dialect: 'mysql',
//   sync: { hooks: true }
// });

import db from '../../database/models';

export const connectToDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (e) {
    throw e;
  }
};

export default db;
