import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Leave",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
      fromDate: {
        type: DataTypes.DATEONLY,
      },
      toDate: {
        type: DataTypes.DATEONLY,
      },
      days: {
        type: DataTypes.INTEGER,
      },
      year: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "leave",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
