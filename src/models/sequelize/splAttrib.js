import { Sequelize } from "sequelize";

const data = (sequelize, DataTypes = Sequelize) => {
  return sequelize.define(
    "SplAttrib",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      persId: {
        type: DataTypes.INTEGER,
      },

      attrib: {
        type: DataTypes.STRING,
      },
      remark: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "splAttrib",
      underscored: true,
      timestamps: true,
    }
  );
};
export default data;
