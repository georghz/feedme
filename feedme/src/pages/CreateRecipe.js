import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./CreateRecipe.css";

import InputIngredients from "../components/InputIngredients";

import { useContext } from "react";
import { AuthContext } from "../App";

export default function CreateRecipe() {
  const user = useContext(AuthContext);

  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipeSteps, setRecipeSteps] = useState([""]);
  //const [images, setImages] = useState([]);
  //const [imageURLs, setImageURLs] = useState([]);

  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0]; // get the supplied file
    // if there is a file, set image to that file
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      // if there is no file, set image back to null
    } else {
      setImage(null);
    }
  };

  const uploadRecipe = async () => {
    await uploadToFirebase().then((url) => {
      console.log(url);
      // createRecipe(url);
    });
  };

  const uploadToFirebase = async () => {
    // if there is an image upload it
    let url = null;

    if (image) {
      const storageRef = ref(storage, image.name);

      await uploadBytes(storageRef, image).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        console.log(storageRef.fullPath);
        getDownloadURL(ref(storage, image.name)).then((ret) => {
          console.log(ret);
          createRecipe(ret);
        });
      });
    } else {
      createRecipe(null);
    }
  };

  const recipesCollectionRef = collection(db, "recipes");
  let navigate = useNavigate();

  const createRecipe = async (url) => {
    console.log(url);
    //await uploadToFirebase()
    console.log(recipeSteps)
    await addDoc(recipesCollectionRef, {
      title: recipeTitle,
      recipeText: ingredients,
      steps: recipeSteps,
      likes: 0,
      likedBy: [],
      author: { name: user.displayName, id: user?.uid },
      imgURL: url,
    });
    navigate("/");
  };

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);

  /* Fra Elizabeths forsøk på bildestøtte
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

*/

  return (
    <div className="createRecipePage">
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
        {/*  */}
        {/* <div className="inputGp">
          <label> Ingredients:</label>
          <textarea
            placeholder="Ingredients..."
            onChange={(event) => {
              setRecipeSteps(event.target.value);
            }}
          />
        </div> */}
        <InputIngredients ingredientsList={recipeSteps} setIngredientsList={setRecipeSteps} />
        {/*  */}
        <div className="inputGp">
          <label> Steps:</label>
          <textarea
            placeholder="Steps..."
            onChange={(event) => {
              setIngredients(event.target.value);
            }}
          />
        </div>
        <input
          type="file"
          accept="image/x-png,image/jpeg"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
        <button onClick={uploadRecipe} disabled={recipeTitle === ""}> Submit recipe</button>
      </div>
    </div>
  );
}
