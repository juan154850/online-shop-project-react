import React from "react";
import "./LogoutPage.css";
import { useAuth } from "../Auth";

const LogoutPage = () => {
  
  const auth = useAuth();

  const logout = (e) => {
    e.preventDefault();
    auth.logout();
  };

  return (
    <>
      <h1>logout</h1>
      <form onSubmit={logout}>
        <label>Are you sure to want logout?</label>
        <button type="submit">logout</button>
      </form>
    </>
  );
};

export { LogoutPage };
