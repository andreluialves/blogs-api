const Joi = require('joi');
const db = require('../database/models');

const categoriesService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(data);
    if (error) throw error;
    
    return value;
  },
  
  create: async ({ name }) => {
    const newCategory = await db.Category.create({ name });
    return newCategory;
  },
};

module.exports = categoriesService;