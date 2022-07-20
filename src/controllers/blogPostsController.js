const blogPostsService = require('../services/blogPostsService');
const jwtService = require('../services/jwtService');

const blogPostsController = {
  create: async (req, res) => {
    const user = jwtService.validateToken(req.headers.authorization);
    const { id: userId } = user.data;
    const { title, content, categoryIds } = blogPostsService.validateBody(req.body);
    const blogPost = await blogPostsService.create(title, content, categoryIds, userId);
    
    res.status(201).json(blogPost);
  },

  list: async (req, res) => {
    const blogPosts = await blogPostsService.list();
    res.status(200).json(blogPosts);
  },

  findById: async (req, res) => {
    const blogPost = await blogPostsService.findByIdLazy(req.params.id);

    res.status(200).json(blogPost);
  },

  edit: async (req, res) => {
    const user = jwtService.validateToken(req.headers.authorization);
    const { id: userId } = user.data;
    const { id } = req.params;
    const { title, content } = blogPostsService.validateBody(req.body);
    const blogPost = await blogPostsService.edit(title, content, id, userId);
    
    res.status(200).json(blogPost);
  },
};

module.exports = blogPostsController;