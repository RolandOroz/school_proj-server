import {
  dbSequlizeMysqlPool,
  DataTypes,
} from "../config/dbSequelizeMysqlPool.js";

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
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    role: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [5, 5],
      },
    },
  },
  {
    // Prevent auto pluralisation of entity name
    freezeTableName: true,
    // Create auto timestamps
    timestamps: true,
  }
);
