import axios from 'axios';

export const Logout = () => {
  async function logOut() {
    await axios.get(import.meta.env.VITE_API_URL + '/utils/logout');
    localStorage.removeItem('token');
    window.location.href = "/login";
  }
  logOut();
}

export default Logout;