import React from "react";
import { auth, provider } from "../firebase-config";
import { signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import Login from "../components/Login";
import Profile from "../components/Profile";
import { useContext } from "react";
import { AuthContext } from "../App";
import { Button } from "@mui/material";
import { ThemeContext } from "../contexts/theme";

function ProfilePage() {
  const user = useContext(AuthContext);
  const [{ theme, isDark }] = useContext(ThemeContext);

  const signUserOut = () => {
    signOut(auth).then(() => {
      window.location.pathname = "/profilepage";
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
          <Profile></Profile>
          <div className="buttonGroup">
            <Button
              variant="outlined"
              onClick={signUserOut}
              sx={{ color: theme.color, borderColor: theme.color }}
            >
              {" "}
              Log Out
            </Button>
            <> </>
            <Button
              variant="outlined"
              onClick={deletUser}
              sx={{ color: theme.color, borderColor: theme.color }}
            >
              {" "}
              Delete User{" "}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
