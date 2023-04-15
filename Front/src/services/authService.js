import axios from 'axios';

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

const authService = {
  login,
};

export default authService;
