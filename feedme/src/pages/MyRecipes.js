import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import "./Recipes.css";
import "./CreateRecipe";
import Recipe from "../components/Recipe";

import { useContext } from "react";
import { AuthContext } from "../App";

export default function MyRecipes() {
  const [postLists, setPostList] = useState([]);
  const user = useContext(AuthContext);

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
    <div className="homePage">
      {postLists.length === 0 ? <h1>You have not created any recipes yet ... </h1> :
      postLists.map((recipe) => {
        return <Recipe recipe={recipe} triggerUpdate={getMyPosts}/> 
      })}
    </div>
  );
}