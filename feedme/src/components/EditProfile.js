import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

import { useContext } from "react";
import { AuthContext } from "../App";

function CreateRecipe() {
  const user = useContext(AuthContext);

  const [profile, setProfile] = useState();
  
  const postsCollectionRef = collection(db, "recipes");
  let navigate = useNavigate();

  const createRecipe = async () => {
    await addDoc(postsCollectionRef, {
      title: recipeTitle,
      postText: ingredients,
      steps: recipeSteps,
      likes: 0,
      likedBy: [],
      author: { name: user.displayName, id: user?.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Recipe</h1>
        <div className="inputGp">
          <label> Recipe Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setRecipeTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Ingredients:</label>
          <textarea
            placeholder="Ingredients..."
            onChange={(event) => {
              setRecipeSteps(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Steps:</label>
          <textarea
            placeholder="Steps..."
            onChange={(event) => {
              setIngredients(event.target.value);
            }}
          />
        </div>
        <button onClick={createRecipe}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreateRecipe;
