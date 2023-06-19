import {
  dbSequlizeMysqlPool,
  DataTypes,
} from "../config/dbSequelizeMysqlPool.js";


// SQL "users" table
export const userSchema = dbSequlizeMysqlPool.define(
  "users",
  {
    _id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(105),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 105],
      },
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [4, 250],
      },
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      unique: true,
    },
    //roles: {},
    refreshToken: {
      type: DataTypes.STRING(255),
    },
  },
  {
    // Prevent auto pluralisation of entity name
    freezeTableName: true,
    // Create auto timestamps
    timestamps: true,
  }
);

