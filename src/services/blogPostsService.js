const Joi = require('joi');
const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const db = require('../database/models');
const { runSchemaBlogPost, checkCategoryIds } = require('./validators');

const blogPostsService = {
  validateBody: runSchemaBlogPost(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().positive().integer()),
  })),

  create: async (title, content, categoryIds, userId) => {
    await checkCategoryIds(categoryIds);
    const result = sequelize.transaction(async (transaction) => {
      const newBlogPost = await db.BlogPost.create(
        { title, content, categoryIds, userId }, { transaction },
      );

      const blogPost = newBlogPost.dataValues;

      const createCategory = categoryIds.map((item) =>
        db.PostCategory.create({ postId: blogPost.id, categoryId: item }, { transaction }));
      await Promise.all(createCategory);

      return newBlogPost;
    });

    return result;
  },

  list: async () => {
    const blogPosts = await db.BlogPost.findAll({
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    return blogPosts;
  },

  findByIdLazy: async (id) => {
    const blogPost = await db.BlogPost.findByPk(id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!blogPost) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    return blogPost;
  },

  edit: async (title, content, id, userId) => {
    const blogPost = await db.BlogPost.findByPk(id);

    if (!blogPost || blogPost.dataValues.userId !== userId) {
      const e = new Error('Unauthorized user');
      e.name = 'UnauthorizedError';
      throw e;
    }

    await db.BlogPost.update({ title, content }, {
      where: { userId },
    });

    const editedBlogPost = await db.BlogPost.findByPk(id, {
      include: [
        { model: db.User, as: 'user', attributes: { exclude: ['password'] } },
        { model: db.Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return editedBlogPost;
  },

  remove: async (id, userId) => {
    const blogPost = await db.BlogPost.findByPk(id);

    if (!blogPost) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError';
      throw e;
    }

    if (blogPost.dataValues.userId !== userId) {
      const e = new Error('Unauthorized user');
      e.name = 'UnauthorizedError';
      throw e;
    }

    await db.BlogPost.destroy({
      where: { id },
    });
  },
};

module.exports = blogPostsService;