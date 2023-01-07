import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Ppt",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },

      date: {
        type: DataTypes.DATEONLY,
      },
      result: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "ppt",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
