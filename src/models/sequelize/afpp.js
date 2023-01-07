import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Afpp",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      openingBal: {
        type: DataTypes.INTEGER,
      },
      closingBal: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: "afpp",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
