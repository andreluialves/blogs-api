'use strict';

const createBlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
    {
      tableName: 'BlogPosts',
      createdAt: 'published',
      updatedAt: 'updated',
    }
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' }
    );
  };

  return BlogPost;
};

module.exports = createBlogPost;