const Joi = require('joi');
const db = require('../database/models');
// const jwtService = require('./jwtService');
// const { User } = require('../database/models/user');

const usersService = {
  validateBody: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string(),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      error.message = 'Some required fields are missing';
      error.name = 'ValidationError';

      throw error;
    }
    
    return value;
  },

  /* create: async (displayName, email, authPassword, image) => {
    const user = await db.User.findAll({ where: { email } });

    if (!user || user === undefined) {
      const err = new Error('User already registered');
      err.name = 'ConflictError';
      throw err;
    }

    const newUser = await db.User.create(displayName, email, authPassword, image);

    return newUser;
  }, */
  create: async ({ displayName, email, password, image }) => {
    const user = await db.User.create({ displayName, email, password, image });
    return user;
  },
};

module.exports = usersService;