import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Cadre",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      cadre: {
        type: DataTypes.STRING,
      },
      fromDate: {
        type: DataTypes.DATEONLY,
      },
      toDate: {
        type: DataTypes.DATEONLY,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      result: {
        type: DataTypes.BOOLEAN,
        default: true,
      },
    },
    {
      tableName: "cadre",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
