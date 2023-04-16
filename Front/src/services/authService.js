import axios from 'axios';
import { json } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:5002',
});

const login = async (userData) => {
  const response = await api.post('/login', userData);
  if (response.data) {
    console.log(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const getUsers = async () => {
  const response = await api.get('/getAllUsers');
  if (response.data) {
    console.log(response.data);
    localStorage.setItem('users', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
  getUsers,
};

export default authService;
