import React from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";

const routes = [];
routes.push({
  to: "/",
  text: "Home",
});
routes.push({
  to: "/products",
  text: "Products",
});
routes.push({
  to: "/auth",
  text: "Login",
});

const Menu = () => {
  return (
    <nav>
      <ul>
        {routes.map((element) => (
          <li key={element.to}>
            <NavLink
              to={element.to}
              style={({ isActive }) => ({
                color: isActive ? "gray" : "black",
              })}>
              {element.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Menu };
