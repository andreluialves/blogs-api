const { Router } = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = Router();

router.post('/', usersController.create);

router.use(authController.validateToken);

router.get('/', usersController.list);

router.get('/:id', usersController.findById);

router.delete('/me', usersController.removeMe);

module.exports = router;
