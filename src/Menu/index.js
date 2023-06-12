import React from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Auth";

const routes = [];
routes.push({
  to: "/",
  text: "Home",
  private: false,
});
routes.push({
  to: "/products",
  text: "Products",
  private: false,
});
routes.push({
  to: "/login",
  text: "Login",
  private: false,
  publicOnly: true,
});
routes.push({
  to: "/logout",
  text: "Logout",  private: true,
  
});
routes.push({
  to: "/users/me",
  text: "My account",
  private: true,
});
const Menu = () => {
  const auth = useAuth();  

  return (
    <nav>
      <ul>
        {routes.map((element) => {
          if (element.private && !auth.user) return null;
          if (element.publicOnly && auth.user) return null;

          return (
            <li key={element.to}>
              <NavLink
                to={element.to}
                style={({ isActive }) => ({
                  color: isActive ? "gray" : "black",
                })}>
                {element.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { Menu };
