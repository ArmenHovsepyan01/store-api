import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'node:process';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config =
  require('C:\\Users\\user\\WebstormProjects\\store\\server\\src\\database\\config\\config.json')[
    env
  ];
const db: Record<string, any> = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file !== 'models.ts' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    console.log(file);
    const model = require(`./${file.replace('.ts', '')}`).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
