import "./Profile.css";
import { useContext } from "react";
import { AuthContext } from "../App";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Profile() {
  const user = useContext(AuthContext);
  let createdValue = 0;
  let likedValue = 0;

  const getCreatedRecipesCount = async () => {
    const q = query(
      collection(db, "recipes"),
      where("author.id", "==", user.uid)
    );
    const data = await getDocs(q);
    console.log(data.size);
    createdValue = data.size;
    console.log("Created: " + createdValue);
    return createdValue;
  };

  const getLikedPostsCount = async () => {
    const q = query(
      collection(db, "recipes"),
      where("likedBy", "array-contains", user?.uid)
    );
    const data = await getDocs(q);
    likedValue = data.size;
    console.log("LIKES = " + likedValue);
    return likedValue;
  };
  
  useEffect(() => {
    getCreatedRecipesCount();
    getLikedPostsCount();
  }, []);

  return (
    
    <div className="profileBox">
      <img src={user.photoURL}/>
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <p>Total recipes created: {getCreatedRecipesCount}</p> 
      <p>Total likes given: {getLikedPostsCount}</p>
    </div>
    
  );
}
