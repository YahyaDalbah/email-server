export function validate(schema) {
  return (req, res, next) => {
    const input = { ...req.body };

    const validationRes = schema.validate(input);
    if (validationRes.error) {
      return next(validationRes.error.details[0].message.replaceAll('"', ""));
    }
    next();
  };
}
