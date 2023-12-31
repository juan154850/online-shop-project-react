import React from "react";
import { useAuth } from "../Auth";

const LoginForm = () => {
  const [username, setUsername] = React.useState(``);
  const [password, setPassword] = React.useState(``);
  
  const auth = useAuth(); //contiene el estado del usuario y los métodos de login y logout

  const login = async (e) => {
    e.preventDefault();    
    await auth.login({ username, password });
  };

  return (
    <form onSubmit={login}>
      <label>Username</label>
      <input
        autoComplete="current-username"
        required
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <label>Password</label>
      <input
        autoComplete="current-password"
        required
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export { LoginForm };
