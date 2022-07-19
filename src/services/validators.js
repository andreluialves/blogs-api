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

module.exports = { runSchema, runSchemaBlogPost };
