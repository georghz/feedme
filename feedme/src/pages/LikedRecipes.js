import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "./Recipes.css";
import "./CreateRecipe";
import RecipeLike from "../components/RecipeLike";

import { useContext } from "react";
import { AuthContext } from "../App";

export default function LikedRecipes() {
  const [postLists, setPostList] = useState([]);
  const user = useContext(AuthContext);

  const getLikedPosts = async () => {
    const q = query(
      collection(db, "recipes"),
      where("likedBy", "array-contains", user.uid)
    );
    const data = await getDocs(q);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    /*if (!isAuth) {
      navigate("/login");  Må ha med dette på et punkt slik at vi hindrer at brukere som ikke
    }                      er logget inn kan gå til ./likedrecipes */
    getLikedPosts();
    //checkForEmptyLikedList();
  }, [user]);

  /*
  function checkForEmptyLikedList (){
    console.log(postLists.length);
    if (postLists.length == 0) {          Sjekke hvis antall likte oppskrifter er null, så bør vi vise
      console.log("Zero likes!");         dette på skjermen til brukeren. Ikke fikset enda
    }
  }*/

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              {/* <DeleteRecipe post={post} isAuth={isAuth} triggerUpdate={getPosts}/> */}
            </div>
            <b>Ingredients: </b>
            <div className="postIngredientContainer"> {post.steps} </div>
            <b> Steps: </b>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
            <RecipeLike recipe={post} triggerUpdate={getLikedPosts} />
          </div>
        );
      })}
    </div>
  );
}
