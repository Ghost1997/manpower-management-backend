import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Weapon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      weapon: {
        type: DataTypes.STRING,
      },
      regnNo: {
        type: DataTypes.STRING,
      },
      issueDate: {
        type: DataTypes.DATEONLY,
      },
      depositedDate: {
        type: DataTypes.DATEONLY,
      },
      remark: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "weapon",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
