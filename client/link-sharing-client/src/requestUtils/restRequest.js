import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:5000/api';

export const login = async (email, password) => {
    const response = await axios.post('/api/login', {
      email,
      password
    });
    return response.data;
};

export const register = async (email, password) => {
    const response = await axios.post('/api/register', {
      email,
      password
    });
    return response.data;
};

export const logout = async () => {
    const response = await axios.post('/api/logout', {});
    return response.data;
};