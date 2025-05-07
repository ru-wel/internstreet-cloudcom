import { useState, useEffect, createContext, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

const UserWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [role, setRole] = useState(null);
  const [isVPN, setIsVPN] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/validate-token", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        const res = await axios.get(import.meta.env.VITE_API_URL + "/utils/realIP");
        const vpnDetected = res.data.proxy;

        if (!response.ok && !data.valid){
          setIsAuthenticated(false);
        }
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()){
          localStorage.removeItem('token');
          setRole(null);
          setIsAuthenticated(false);
        } else { 
          setIsAuthenticated(true);
          setRole(decoded.role);
          vpnDetected ? (setIsVPN(true)): (setIsVPN(false));
        }
      } catch (error) {
        console.error('Error decoding token: ', error);
      }
    }
    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <div className='flex justify-center align-middle h-screen w-screen'>Loading...</div>;
  }

  if (!isAuthenticated){
    alert('Please log in.');
    return <Navigate to="/login" replace />
  }

  return (
    <AuthContext.Provider value={{ role, isVPN }}>
      <Outlet />
    </AuthContext.Provider>
  );

}

const AdminWrapper = () => {
  const { role, isVPN } = useContext(AuthContext);

  if (!role || role !== 'admin') {
    alert('Insufficient permissions.');
    return <Navigate to="/" replace />;
  }
  
  // if (!isVPN) {
  //   alert('VPN not detected.');
  //   return <Navigate to="/" replace />;
  // }
  
  return <Outlet />;
  
}

const GuestWrapper = () => {
  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/validate-token", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok && !data.valid){
          setIsValidToken(false);
        }
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()){
          localStorage.removeItem('token');
          setRole(null);
          setIsValidToken(false);
        } else { 
          setIsValidToken(true);
          setRole(decoded.role); 
        }
      } catch (error) {
        console.error('Error decoding token: ', error);
      }
    }
    checkToken();
  }, []);

  if (isValidToken === null) {
    return <div className='flex justify-center align-middle h-screen w-screen'>Loading...</div>;
  }

  if (isValidToken) {
    alert('Already logged in.');
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}

export { UserWrapper, AdminWrapper, GuestWrapper, AuthContext };