const saleSchema = require('../../Schemas/saleSchema');

module.exports = async (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  
  if (error) return res.status(400).json({ message: error.message });

  next();
};