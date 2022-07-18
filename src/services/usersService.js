const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');
const { runSchema } = require('./validators');

const usersService = {
  validateBody: runSchema(Joi.object({
    displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string(),
  })),

  create: async ({ displayName, email, authPass, image }) => {
    const findUser = await db.User.findOne({ where: { email } });

    if (findUser !== null) {
      const err = new Error('User already registered');
      err.name = 'ConflictError';
      throw err;
    }
    const newUser = await db.User.create({ displayName, email, password: authPass, image });
    const { password, ...userWithoutPassword } = newUser.dataValues;
    const token = jwtService.createToken(userWithoutPassword);

    return token;
  },

  list: async () => {
    const users = await db.User.findAll({ attributes: { exclude: ['password'] } });
    return users;
  },

  findByIdLazy: async (id) => {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      const e = new Error('User does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    return user;
  },
};

module.exports = usersService;