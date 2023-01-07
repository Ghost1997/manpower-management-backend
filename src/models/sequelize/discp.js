import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Discp",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      charge: {
        type: DataTypes.STRING,
      },
      punishment: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: "discp",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
