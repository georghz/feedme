import React from "react";
import { auth, provider } from "../firebase-config";
import { signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

import Login from "../components/Login";

import { useContext } from "react";
import { AuthContext } from "../App";

function ProfilePage() {
  const user = useContext(AuthContext);

  const signUserOut = () => {
    signOut(auth).then(() => {
      window.location.pathname = "/login";
    });
  };

  const deletUser = () => {
    deleteUser(user);
  };

  return (
    <div className="profilePage">
      {user === null ? (
          <Login />
        ) : (
          <>
            <button onClick={signUserOut}> Log Out</button>
            <button onClick={deletUser}> Delete User </button>
          </>
        )}
    </div>
  );
}

export default ProfilePage;
