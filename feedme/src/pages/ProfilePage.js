import React from "react";
import { auth, db } from "../firebase-config";
import { signOut, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import "./ProfilePage.css";
import Login from "../components/Login";
import Profile from "../components/Profile";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import { Button } from "@mui/material";
import { ThemeContext } from "../contexts/theme";

function ProfilePage() {
  const user = useContext(AuthContext);
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [postLists, setPostList] = useState([]);

  const signUserOut = () => {
    signOut(auth).then(() => {
      window.location.pathname = "/profilepage";
    });
  };

  const deletUser = () => {
    deleteUser(user);
    console.log("User id: " + user.uid);
    console.log("Alle postene: " + postLists);
    updateDeletedPosts();
  };

  const updateDeletedPosts = async () => {
    for (let i = 0; i < postLists.length; i++) {
      console.log("Id-en til den unike som blir loopet " + postLists[i].id);
      console.log(
        "Brukeren sin post som slettes har så mange likes : " +
          postLists[i].likes
      );
      const toBeUpdated = doc(db, "recipes", postLists[i].id);
      await updateDoc(toBeUpdated, {
        author: { name: "NON-EXISTING USER", id: null },
      });
    }
  };

  const getMyPosts = async () => {
    const q = query(
      collection(db, "recipes"),
      where("author.id", "==", user.uid)
    );
    const data = await getDocs(q);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getMyPosts();
  }, []);

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
