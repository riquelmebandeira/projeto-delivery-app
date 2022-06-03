const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const generateToken = async (data) => {
  const secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
  
  const token = jwt.sign(data, secret, { expiresIn: '1d', algorithm: 'HS256' });

  return token;
};

module.exports = {
  generateToken,
};