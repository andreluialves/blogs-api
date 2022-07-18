'use strict';

const createCategory = (sequelize, DataTypes) => {
  const User = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      tableName: 'Categories',
      timestamps: false,
    }
  );

  return User;
};

module.exports = createCategory;