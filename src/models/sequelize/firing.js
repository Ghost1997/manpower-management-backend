import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Firing",
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
      tableName: "firing",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
