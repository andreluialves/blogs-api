const usersService = require('../services/usersService');

const usersController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = usersService.validateBody(req.body);
    const authPass = password;
    const token = await usersService.create({ displayName, email, authPass, image });

    res.status(201).json({ token });
  },

  list: async (req, res) => {
    const users = await usersService.list();
    res.status(200).json(users);
  },

  findById: async (req, res) => {
    const user = await usersService.findByIdLazy(req.params.id);

    res.status(200).json(user);
  },
};

module.exports = usersController;