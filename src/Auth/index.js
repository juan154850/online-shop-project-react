import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {  
  const [user, setUser] = React.useState(null); //cuando user es null, aún no estamos autenticados.
  const navigate = useNavigate();

  /**
   * Search the database for a user and, if the information is correct, log in the user.
   * @param {string} username - Username of the account. (from a form)
   * @param {string} password - password of the account. (from a form)
   * @returns {Object} - An object with all the user information.
   */
  const login = async ({ username, password }) => {
    const getUser = async () => {
      try {
        const resp = await fetch(`http://localhost:8000/auth`, {
          headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&scope=&client_id=&client_secret=`,
          method: "POST",
        });
        const data = await resp.json();
        setUser(data);
        //if the log in was successful, we now fetch the particular user's data and redirect it to his profile path.
        
        
      } catch (error) {
        throw error;
      }
    };
    await getUser();
    // setUser({ username, password });
    // navigate(`/users/me`);
  };

  const logout = () => {
    setUser(null);
    navigate(`/`);
  };

  const auth = { user, login, logout };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// React Hook
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export { AuthProvider, useAuth };
