export const valiBodyRequest = (schemaValid) => (req, res, next) => {
  try {
    const data = schemaValid.parse(req.body);
    next();
  } catch (error) {
    if (error) {
      const errors = error.errors.map(
        (item) => `${item.path}: ${item.message}`
      );
      res.status(400).json({ errors });
    }
  }
};
