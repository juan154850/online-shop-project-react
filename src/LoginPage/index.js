import React from "react";
import "./LoginPage.css";
import { useAuth } from "../Auth";
import { AppLoading } from "../Messages/AppLoading";
import { AppError } from "../Messages/AppError";
import { LoginForm } from "./LoginForm";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const auth = useAuth(); //contiene el estado del usuario y los métodos de login y logout
  if (auth.user) {
    return <Navigate to="/users/me" />;
  }
  return (
    <>
      <h1>Login</h1>
      {auth.isLoading && <AppLoading />}
      {auth.onError && (
        <>
          <AppError message={`Invalid credentials, please log in again.`} />
          <LoginForm />
        </>
      )}
      {!auth.isLoading && !auth.onError && <LoginForm />}
    </>
  );
};

export { LoginPage };
