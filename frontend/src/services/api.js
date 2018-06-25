import axios from 'axios';
import io from 'socket.io-client';

const apiURL = 'http://127.0.0.1:3001';
const baseURL = `${apiURL}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      const scheme = `Bearer ${token}`;
      req.headers.authorization = scheme;
      return req;
    }
    return req;
  },
  (err) => {
    console.log('ERROR_AXIOS_INTERCEPTOR', err);
    return Promise.reject(err);
  },
);

const socketConnect = () => {
  const socket = io(apiURL, {
    secure: true,
    query: {
      token: localStorage.getItem('access_token'),
    },
  });
  socket.connect();
  return socket;
};

export { api, socketConnect };
