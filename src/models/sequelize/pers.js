import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Pers",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      armyNo: {
        type: DataTypes.STRING,
        unique: true,
      },
      rank: {
        type: DataTypes.INTEGER,
      },
      appt: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATEONLY,
      },
      doe: {
        type: DataTypes.DATEONLY,
      },
      icard: {
        type: DataTypes.STRING,
        unique: true,
      },
      aadhar: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      pan: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        type: DataTypes.BIGINT,
        unique: true,
      },
      coy: {
        type: DataTypes.STRING,
      },
      pl: {
        type: DataTypes.STRING,
      },
      height: {
        type: DataTypes.FLOAT,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
      bank: {
        type: DataTypes.STRING,
      },
      account: {
        type: DataTypes.STRING,
        unique: true,
      },
      father: {
        type: DataTypes.STRING,
      },
      mother: {
        type: DataTypes.STRING,
      },
      wife: {
        type: DataTypes.STRING,
      },
      bloodGroup: {
        type: DataTypes.STRING,
      },
      class: {
        type: DataTypes.STRING,
      },
      posted: {
        type: DataTypes.STRING,
      },
      photo: {
        type: DataTypes.STRING,
      },
      education: {
        type: DataTypes.INTEGER,
      },
      medCat: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "pers",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
