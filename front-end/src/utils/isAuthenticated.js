const { authenticate } = require('../services/requests')

async function isAuthenticated() {
  try {
    const { token } = JSON.parse(localStorage.getItem('user'));

    const endpoint = '/login/authenticate';

    const { data } = await authenticate(endpoint, token); // pode ocorrer um erro aqui

    return data.role;
  } catch (err) {
    return false;
  }
}

module.exports = { isAuthenticated };