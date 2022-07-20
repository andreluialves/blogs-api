const usersService = require('../services/usersService');
const jwtService = require('../services/jwtService');

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

  removeMe: async (req, res) => {
    const user = jwtService.validateToken(req.headers.authorization);
    const { id: userId } = user.data;
    await usersService.removeMe(userId);
    
    res.sendStatus(204);
  },
};

module.exports = usersController;