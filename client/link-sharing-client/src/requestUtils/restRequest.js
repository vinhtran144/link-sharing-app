import axios from 'axios';
// These request will have 2 return keys
// isSuccessful is boolean to if the request go through
// serverResponse contain entire response for easy troubleshooting

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/login', {
      email,
      password
    });
    return {isSuccessful: true, serverResponse: response.data};
  } catch (e) {
    return {isSuccessful: false, serverResponse: e};
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post('/api/register', {
      email,
      password
    });
    return {isSuccessful: true, serverResponse: response.data};
  } catch(e) {
    return {isSuccessful: false, serverResponse: e};
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('/api/logout', {});
    return {isSuccessful: true, serverResponse: response.data};
  } catch(e) {
    return {isSuccessful: false, serverResponse: e};
  }
};