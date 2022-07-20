const db = require('../database/models');

const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = error.details[0].message;
    throw error;
  }
  return value;
};

const runSchemaBlogPost = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = 'Some required fields are missing';
    throw error;
  }
  return value;
};

const checkCategoryIds = async (categoryIds) => {
  const idsChecked = await Promise.all(categoryIds.map(async (item) => db.Category.findByPk(item)));
  const checkResult = idsChecked.filter((item) => item !== null);
    if (checkResult.length !== categoryIds.length) {
    const error = new Error('"categoryIds" not found');
    error.name = 'ValidationError';
    throw error;
  }

  return idsChecked;
};

module.exports = { runSchema, runSchemaBlogPost, checkCategoryIds };
