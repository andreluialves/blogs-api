'use strict';

const createPostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
    },
  },
    {
      tableName: 'PostCategories',
      timestamps: false,
    }
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'id',
    });
  };

  return PostCategory;
};

module.exports = createPostCategory;