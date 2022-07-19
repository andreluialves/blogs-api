const Joi = require('joi');
const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const db = require('../database/models');
const { runSchemaBlogPost } = require('./validators');

const blogPostsService = {
  validateBody: runSchemaBlogPost(Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().positive().integer()).required(),
  })),

  create: async ({ title, content, categoryIds, userId }) => {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await db.BlogPost.create(
        { title, content, categoryIds, userId }, { transaction: t },
      );

      categoryIds.forEach(async (item) => {
        const findItem = db.Category.findOne({ id: { item } });
        if (!findItem) {
          const err = new Error('"categoryIds" not found');
          err.name = 'ValidationError';
          throw err;
        }
        await db.PostCategory.create(
          { postId: blogPost.dataValues.id, categoryId: item }, { transaction: t },
        );
      });
      return true;
    });
    return result;
  },

/*   async create(data, userId) {
    const result = sequelize.transaction(async (transaction) => {
      const { dataValues: post } = await BlogPost.create(
        { ...data, userId },
        { transaction },
      );

      try {
        const checkCategoryIds = data.categoryIds.map((categoryId) =>
          categoriesService.getById(categoryId));
        await Promise.all(checkCategoryIds);
      } catch (_err) {
        throw new NotFoundError('"categoryIds" not found', 400);
      }

      const createLinks = data.categoryIds.map((categoryId) =>
        PostCategory.create({ postId: post.id, categoryId }, { transaction }));
      await Promise.all(createLinks);

      return post;
    });

    return result;
  }, */
};

module.exports = blogPostsService;