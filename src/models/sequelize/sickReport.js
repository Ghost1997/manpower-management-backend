import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "SickReport",
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
      symptoms: {
        type: DataTypes.STRING,
      },
      diag: {
        type: DataTypes.STRING,
      },
      advice: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "sickReport",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
