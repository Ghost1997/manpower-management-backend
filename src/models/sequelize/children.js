import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "Children",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },
      child: {
        type: DataTypes.BOOLEAN,
      },
      name: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.DATEONLY,
      },
      school: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "children",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
