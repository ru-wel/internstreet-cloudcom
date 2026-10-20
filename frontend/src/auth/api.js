import axios from 'axios';

// The login token, as a header for API calls. Empty when logged out.
export const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Every axios call sends the token, so the backend knows who is asking
axios.interceptors.request.use((config) => {
  const { Authorization } = authHeaders();
  if (Authorization) config.headers.Authorization = Authorization;
  return config;
});

// An expired or invalid token sends the user back to log in. Skipped for the login
// request itself, where 401 just means a wrong email or password.
const handleUnauthorized = (status, url) => {
  if (status === 401 && localStorage.getItem('token') && !url.endsWith('/login')) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    handleUnauthorized(error.response?.status, error.config.url);
    return Promise.reject(error);
  },
);

// fetch with the token attached and the same 401 handling as axios
export const authFetch = async (url, options = {}) => {
  const response = await fetch(url, { ...options, headers: { ...options.headers, ...authHeaders() } });
  handleUnauthorized(response.status, url);
  return response;
};
