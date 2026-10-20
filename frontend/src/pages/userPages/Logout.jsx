import axios from 'axios';

export const Logout = () => {
  async function logOut() {
    try {
      await axios.get(import.meta.env.VITE_API_URL + '/utils/logout');
    } finally {
      // Log out locally even if the server call fails (e.g. the session already expired)
      localStorage.removeItem('token');
      window.location.href = "/login";
    }
  }
  logOut();
}

export default Logout;