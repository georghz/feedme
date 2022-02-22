import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "./Recipes.css";
import "./CreateRecipe";
import Recipe from "../components/Recipe";
import { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

export default function LikedRecipes() {
  const [postLists, setPostList] = useState([]);
  const user = useContext(AuthContext);
  
  const getLikedPosts = async () => {
    const q = query(
      collection(db, "recipes"),
      where("likedBy", "array-contains", user?.uid)
    );
    const data = await getDocs(q);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    /*if(user == null){
      Navigate("/login")
    }*/
    getLikedPosts();
    //checkForEmptyLikedList();
  }, [user]);



  return (
    <div className="homePage">
      {postLists.length === 0 ? <h1>You have not liked any recipes yet ... </h1> :
      postLists.map((recipe) => {
        return <Recipe recipe={recipe} triggerUpdate={getLikedPosts}/> 
      })}
    </div>
  );
}
