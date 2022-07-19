const blogPostsService = require('../services/blogPostsService');

const blogPostsController = {
  create: async (req, res) => {
    const { title, content, categoryIds } = blogPostsService.validateBody(req.body);
    const blogPost = await blogPostsService.create({ title, content, categoryIds });

    res.status(201).json(blogPost);
  },

  // list: async (req, res) => {
  //   const blogPosts = await blogPostsService.list();
  //   res.status(200).json(blogPosts);
  // },
};

module.exports = blogPostsController;