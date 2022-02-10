import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import './CreatePost.css'

function CreatePost({ isAuth }) {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const[recipeSteps, setRecipeSteps] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title: recipeTitle,
      postText: ingredients,
      steps: recipeSteps,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

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
        <button onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;