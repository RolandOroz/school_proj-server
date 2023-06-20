import {
  dbSequlizeMysqlPool,
  DataTypes,
} from "../config/dbSequelizeMysql/dbSequelizeMysqlPool.js";

// SQL "expire_times" table
export const expirationTimeEntity = dbSequlizeMysqlPool.define(
  "expire_times",
  {
    _id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    short: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Prevent auto pluralisation of entity name
    freezeTableName: true,
    // Create auto timestamps
    timestamps: false,
  }
);
