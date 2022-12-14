const { Router } = require('express');
const blogPostsController = require('../controllers/blogPostsController');
const authController = require('../controllers/authController');

const router = Router();

router.use(authController.validateToken);

router.get('/search', blogPostsController.findByQuery);

router.post('/', blogPostsController.create);

router.get('/', blogPostsController.list);

router.get('/:id', blogPostsController.findById);

router.put('/:id', blogPostsController.edit);

router.delete('/:id', blogPostsController.remove);

module.exports = router;
