import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "ApptList",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "apptList",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
