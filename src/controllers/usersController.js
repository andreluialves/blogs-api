const usersService = require('../services/usersService');
// const jwtService = require('../services/jwtService');

const usersController = {
/*   create: async (req, res) => {
    const { displayName, email, password, image } = usersService.validateBody(req.body);

    const newUser = await usersService.create(displayName, email, password, image);

    res.status(201).json(newUser);
  }, */
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await usersService.create({ displayName, email, password, image });

    res.status(201).json(user);
  },
};

module.exports = usersController;