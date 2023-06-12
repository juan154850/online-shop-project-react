import React from "react";
import "./ProfilePage.css";
import { useAuth } from "../Auth";

const ProfilePage = () => {
  const auth = useAuth();

  console.log(auth);

  return (
    <>
      <h2>Your Profile</h2>
      <h3>Welcome: {auth.user.username}</h3>
      <ul>
        <li>
          <span>id: </span>
        </li>
        <li>
          <span>first_name: </span>
        </li>
        <li>
          <span>surname: </span>
        </li>
        <li>
          <span>email: </span>
        </li>
        <li>
          <span>country: </span>
        </li>
        <li>
          <span>address: </span>
        </li>
        <li>
          <span>cellphone: </span>
        </li>
      </ul>
    </>
  );
};

export { ProfilePage };
