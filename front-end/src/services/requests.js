import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const authenticate = async (endpoint, token) => {
  setToken(token);

  const response = await api.post(endpoint);

  return response;
};

export const requestData = async (endpoint, token) => {
  setToken(token);
  const { data } = await api.get(endpoint);
  return data;
};

export const postOrders = async (endpoint, token, body) => {
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

export const updateOrder = async (endpoint, token) => {
  setToken(token);
  const { data } = await api.put(endpoint);
  return data;
};

export default api;
