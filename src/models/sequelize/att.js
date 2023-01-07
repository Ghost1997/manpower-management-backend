import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Att",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      unit: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      fromDate: {
        type: DataTypes.DATEONLY,
      },
      toDate: {
        type: DataTypes.DATEONLY,
      },
      employment: {
        type: DataTypes.STRING,
      },
      auth: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "att",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
