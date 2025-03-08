import axios from 'axios';

export const Logout = () => {
  async function logOut() {
    await axios.get('http://localhost:3000/utils/logout');
    localStorage.removeItem('token');
    window.location.href = "/login";
  }
  logOut();
}

export default Logout;