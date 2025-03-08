export const Logout = () => {
  console.log('Clicked logout button');
  const logAction = async () => {
    await axios.get('http://localhost:3000/utils/logout')
  }
  logAction();
  localStorage.removeItem('token');
  window.location.href = "/login";
}

export default Logout;