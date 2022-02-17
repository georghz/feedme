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
    /*if (!isAuth) {
      navigate("/login");  Må ha med dette på et punkt slik at vi hindrer at brukere som ikke
    }                      er logget inn kan gå til ./likedrecipes */
    getMyPosts();
    //checkForEmptyLikedList();
  }, []);

  /*
  function checkForEmptyLikedList (){
    console.log(postLists.length);
    if (postLists.length == 0) {          Sjekke hvis antall likte oppskrifter er null, så bør vi vise
      console.log("Zero likes!");         dette på skjermen til brukeren. Ikke fikset enda
    }
  }*/

  return (
    <div className="homePage">
      {postLists.map((recipe) => {
        return (
    <Recipe recipe={recipe} triggerUpdate={getMyPosts}/>
  ); 
        })}
  </div>
  );
}
