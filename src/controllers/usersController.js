const usersService = require('../services/usersService');

const usersController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = usersService.validateBody(req.body);
    const authPass = password;
    const token = await usersService.create({ displayName, email, authPass, image });

    res.status(201).json({ token });
  },
};

module.exports = usersController;