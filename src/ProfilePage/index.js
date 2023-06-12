import React from "react";
import "./ProfilePage.css";
import { useAuth } from "../Auth";

const ProfilePage = () => {
  const auth = useAuth();

  console.log(auth.user);
  
  const userEntries = Object.entries(auth.user);


  return (
    <>
      <h2>Your Profile</h2>
      <h3>Welcome: {auth.user.first_name}</h3>
      <ul>
        {userEntries.map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </>
  );
};

export { ProfilePage };
