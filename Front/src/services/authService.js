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

const updateUsername = async (data) => {
  console.log(data);
  const response = await api.patch(`/updateUsername/${data.secret}`, data);
  if (response.data) {
    console.log(response);
  }
  return response.data;
};

const updatePassword = async (data) => {
  const response = await api.patch(`/updatePassword/${data.secret}`, data);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

const updatePhoto = async (data) => {
  const response = await api.patch(`/updatePhoto/${data.secret}`, data);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

const authService = {
  updateUsername,
  login,
  getUsers,
  updatePassword,
  updatePhoto,
};

export default authService;
