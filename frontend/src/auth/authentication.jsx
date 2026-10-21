import { useState, useEffect, createContext, useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const UserWrapper = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

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
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        // Only the server can tell if the token is genuine and unexpired; anything else means logged out
        if (!response.ok || !data.valid) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          return;
        }

        setRole(data.user.role);
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking token: ', error);
        setIsAuthenticated(false);
      }
    }
    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <div className='flex justify-center align-middle h-screen w-screen'>Loading...</div>;
  }

  if (!isAuthenticated){
    // Login sends the user back here (with the same state, e.g. the job being applied to)
    return <Navigate to="/login" replace state={{ from: { pathname: location.pathname, state: location.state } }} />
  }

  return (
    <AuthContext.Provider value={{ role, user }}>
      <Outlet />
    </AuthContext.Provider>
  );

}

const AdminWrapper = () => {
  const { role } = useContext(AuthContext);

  if (!role || role !== 'admin') {
    alert('Insufficient permissions.');
    return <Navigate to="/" replace />;
  }
  
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
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok || !data.valid) {
          localStorage.removeItem('token');
          setIsValidToken(false);
          return;
        }
        setIsValidToken(true);
      } catch (error) {
        console.error('Error checking token: ', error);
        setIsValidToken(false);
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