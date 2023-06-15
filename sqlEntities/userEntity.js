import { seqDbConnection, DataTypes } from "../config/dbSequelizeMysqlPool.js";

const { DataTypes } = Sequelize;
// SQL "users" table
export const userSchema = new seqDbConnection.define(
  "users",
  {
    _id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {},
    username: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2,55]
      },
    },
    email: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [4, 250],
      },
    },
    password: {},
    roles: {},
    refreshToken: {},
  },
  {
    // Prevent auto pluralisation of entity name
    freezeTableName: true,
    // Create auto timestamps
    timestamps: true,
  }
);

