// import db from '../config/database';
//
// import { DataTypes, Model } from 'sequelize';
//
// class User extends Model {}
//
// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     isVerified: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false
//     }
//   },
//   {
//     db,
//     modelName: 'User',
//     timestamps: false
//   }
// );
//
// // (async () => {
// //   await User.sync();
// // })();
//
// export default User;
