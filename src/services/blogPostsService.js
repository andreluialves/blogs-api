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

  async create(title, content, categoryIds, userId) {
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
};

module.exports = blogPostsService;