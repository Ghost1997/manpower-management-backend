import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "user id already exists",
        },
      },
      password: {
        type: DataTypes.STRING,
        field: "password",
        get() {
          return null;
        },
      },
    },
    {
      tableName: "admin",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
