import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Promotion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      fromRank: {
        type: DataTypes.INTEGER,
      },
      toRank: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: "promotion",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
