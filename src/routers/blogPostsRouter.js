const { Router } = require('express');
const blogPostsController = require('../controllers/blogPostsController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);

router.post('/', blogPostsController.create);

router.get('/', blogPostsController.list);

module.exports = router;
