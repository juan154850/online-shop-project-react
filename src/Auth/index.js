import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [authCookie, setAuthCookie] = useCookies(["authCookie"]);
  const [user, setUser] = React.useState(null); //cuando user es null, aún no estamos autenticados.
  //estados de carga y error.
  const [isLoading, setIsLoading] = React.useState(false);
  const [onError, setOnError] = React.useState(false);
  const navigate = useNavigate();

  /**
   * Search the database for a user and, if the information is correct, log in the user.
   * @param {string} username - Username of the account. (from a form)
   * @param {string} password - password of the account. (from a form)
   * @returns {Object} - An object with all the user information.
   */
  const login = async ({ username, password }) => {
    const getUser = async () => {
      setOnError(false);
      setIsLoading(true);
      try {
        const resp = await fetch(`http://localhost:8000/auth`, {
          headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&scope=&client_id=&client_secret=`,
          method: "POST",
        });
        if (resp.ok) {
          const data = await resp.json();

          //if the log in was successful, we now fetch the particular user's data and redirect it to his profile path.
          setAuthCookie("authCookie", data, { path: "/" });
          console.log(authCookie.authCookie.access_token);
          const respUser = await fetch("http://localhost:8000/users/me", {
            headers: {
              accept: "application/json",
              "accept-language": "es-ES,es;q=0.9",
              authorization: `Bearer ${authCookie.authCookie.access_token}`,
              "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
            },
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            method: "GET",
            mode: "cors",
            credentials: "include",
          });
          if (respUser.ok) {
            const dataUser = await respUser.json();
            setUser(dataUser);
            setIsLoading(false);
            navigate(`/users/me`);
          } else {
            setIsLoading(false);
            setOnError(true);
            // throw new Error(`Error getting the data.`)
          }
        } else {
          setIsLoading(false);
          setOnError(true);
          // throw new Error(`Invalid credentials.`);
        }
      } catch (error) {
        setOnError(true);
        throw error;
      }
    };

    await getUser();
  };

  const logout = () => {
    setUser(null);
    navigate(`/`);
  };

  const auth = { user, login, logout, isLoading, onError };

  // console.log(auth.user);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// React Hook
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export { AuthProvider, useAuth };
