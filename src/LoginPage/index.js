import React from "react";
import "./LoginPage.css";
import { useAuth } from "../Auth";
import { AppLoading } from "../Messages/AppLoading";
import { AppError } from "../Messages/AppError";
import { LoginForm } from "./LoginForm";

const LoginPage = () => {
  const auth = useAuth(); //contiene el estado del usuario y los métodos de login y logout

  return (
    <>
      <h1>Login</h1>
      {auth.isLoading && <AppLoading />}
      {auth.onError && (
        <>
          <AppError message={`Invalid credentials, please log in again.`} />
          <LoginForm/>
        </>
      )}
      {!auth.isLoading && !auth.onError && <LoginForm />}
    </>
  );
};

export { LoginPage };
