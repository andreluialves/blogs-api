const blogPostsService = require('../services/blogPostsService');
const jwtService = require('../services/jwtService');

const blogPostsController = {
  create: async (req, res) => {
    const user = jwtService.validateToken(req.headers.authorization);
    const { id: userId } = user.data;
    const { title, content, categoryIds } = blogPostsService.validateBody(req.body);
  console.log('procurando bug', categoryIds);
    const blogPost = await blogPostsService.create(title, content, categoryIds, userId);
    
    res.status(201).json(blogPost);
  },

  list: async (req, res) => {
    const blogPosts = await blogPostsService.list();
    res.status(200).json(blogPosts);
  },
};

module.exports = blogPostsController;