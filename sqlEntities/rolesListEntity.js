import {
  dbSequlizeMysqlPool,
  DataTypes,
} from "../config/dbSequelizeMysql/dbSequelizeMysqlPool.js";

export const rolesListSchema = dbSequlizeMysqlPool.define(
  "roles_list",
  {
    roles_code: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      defaultValue: 110,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Prevent auto pluralisation of entity name
    freezeTableName: true,
    // Create auto timestamps
    timestamps: true,
  }
);
