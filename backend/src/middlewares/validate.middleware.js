const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const mensagens = error.details.map((d) => d.message);
    return res.status(400).json({ errors: mensagens });
  }
  next();
};

module.exports = validate;