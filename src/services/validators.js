const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    error.message = error.details[0].message;
    throw error;
  }
  return value;
};

module.exports = { runSchema };

// if (value.password.length < 6) throw error;
// if (value.displayName.length < 8) throw error;
