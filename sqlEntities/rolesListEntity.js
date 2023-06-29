import { Model } from "sequelize";
import { userSchema } from "./userEntity.js";
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

/* rolesListSchema.hasMany(userSchema, {
  foreignKey: "roles",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
userSchema.belongsTo(rolesListSchema, {
  onDelete: "CASCADE",
}); */

/* rolesListSchema.hasMany(userSchema, {
  foreignKey: "role_code",
  foreignKey: "roles",
  as: "users",
});
userSchema.belongsTo(rolesListSchema, {
  foreignKey: "role_code",
}); */
