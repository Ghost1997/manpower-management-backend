import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      state: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      tehsil: {
        type: DataTypes.STRING,
      },
      policeStation: {
        type: DataTypes.STRING,
      },
      vill: {
        type: DataTypes.STRING,
      },
      pin: {
        type: DataTypes.INTEGER,
      },
      nrs: {
        type: DataTypes.STRING,
      },
      distFromBorder: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "address",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
