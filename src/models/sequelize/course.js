import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      course: {
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
      grading: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "course",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
