import {
  dbSequlizeMysqlPool,
  DataTypes,
} from "../config/dbSequelizeMysql/dbSequelizeMysqlPool.js";

// SQL "roles" table 
export const roleSchema = dbSequlizeMysqlPool.define(
  "roles",
  {
    _id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role_name: {
      type: DataTypes.ENUM("admin", "editor", "user"),
      unique: true,
      allowNull: false
    },
    role_code: {
      type: DataTypes.SMALLINT.UNSIGNED,
      unique: true,
      allowNull: false
    },
  },
  {
    // Prevent auto pluralisation of entity name
    freezeTableName: true,
    // Create auto timestamps
    timestamps: false,
  }
);

