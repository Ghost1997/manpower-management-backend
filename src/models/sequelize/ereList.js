import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "EreList",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "ereList",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
