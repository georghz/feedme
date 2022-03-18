import "./Profile.css";
import { useContext } from "react";
import { AuthContext } from "../App";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { ThemeContext } from "../contexts/theme";

export default function Profile() {
  const user = useContext(AuthContext);
  const [createdValue, setCreatedValue] = useState([]);
  const [likedValue, setLikedValue] = useState([]);
  const [{theme}] = useContext(ThemeContext); 

  const getCreatedRecipesCount = async () => {
    const q = query(
      collection(db, "recipes"),
      where("author.id", "==", user.uid)
    );
    return getDocs(q).then((data) => {
      return data.size;
    });
  };

  const getLikedPostsCount = async () => {
    const q = query(
      collection(db, "recipes"),
      where("likedBy", "array-contains", user?.uid)
    );

    return getDocs(q).then((data) => {
      return data.size;
    });
  };

  useEffect(() => {
    getCreatedRecipesCount().then((t) => setCreatedValue(t));
    getLikedPostsCount().then((t) => setLikedValue(t));
  }, []);

  return (
    <div className="profileBox" style={{backgroundColor: theme.textboxColor}}>
      <img src={user.photoURL} />
      <h4>
        {user.displayName} {user.email}
      </h4>
      <p>
        Total recipes created: {createdValue} <br /> Total likes given:{" "}
        {likedValue}
      </p>
    </div>
  );
}
