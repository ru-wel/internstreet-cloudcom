import { useState, useEffect, createContext, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const UserWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/validate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
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
        }
      } catch (error) {
        console.error('Error decoding token: ', error);
      }
    }
    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  return (
    <AuthContext.Provider value={{ role }}>
      <Outlet />
    </AuthContext.Provider>
  );

}

const AdminWrapper = () => {
  const { role } = useContext(AuthContext);

  if (!role || role !== 'admin'){
    return <Navigate to="/" replace /> // TO BE REPLACED
  }

  return <Outlet />
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
        const response = await fetch('http://localhost:3000/validate-token', {
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
          // setRole(null);
          setIsValidToken(false);
        } else { 
          setIsValidToken(true);
          // setRole(decoded.role); 
        }
      } catch (error) {
        console.error('Error decoding token: ', error);
      }
    }
    checkToken();
  }, []);

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  // if (!isValidToken) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}

export { UserWrapper, AdminWrapper, GuestWrapper };