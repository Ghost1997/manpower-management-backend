import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Ere",
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
      fromDate: {
        type: DataTypes.DATEONLY,
      },
      toDate: {
        type: DataTypes.DATEONLY,
      },
      location: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "ere",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
