import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const login = async (email, password) => {
    const response = await axios.post('/login', {
      email,
      password
    });
    console.log(response);
    return response.data;
};

export const register = async (email, password) => {
    const response = await axios.post('/register', {
      email,
      password
    });
    console.log(response);
    return response.data;
};

export const logout = async () => {
    const response = await axios.post('/logout', {});
    console.log(response);
    return response.data;
};