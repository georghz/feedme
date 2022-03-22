import React, { useState, useEffect } from "react";
import { addDoc, doc, collection, getDoc, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./CreateRecipe.css";
import { useParams } from "react-router-dom";

import InputIngredients from "../components/InputIngredients";
import Categories from "../components/Categories";

import { useContext } from "react";
import { AuthContext } from "../App";
import { ThemeContext } from "../contexts/theme";

export default function EditRecipe() {
  const { recipeID } = useParams();

  const user = useContext(AuthContext);
  const [{theme}] = useContext(ThemeContext);

  const recipesCollectionRef = doc(db, "recipes", recipeID);

  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [recipeSteps, setRecipeSteps] = useState("");
  const [categories, setCategories] = useState([]);
  //const [images, setImages] = useState([]);
  //const [imageURLs, setImageURLs] = useState([]);

  const [image, setImage] = useState(null);

  const setRecipe = async () => {
    const docSnap = await getDoc(recipesCollectionRef);
    setRecipeTitle(docSnap.data().title);
    setIngredients(docSnap.data().recipeText);
    setRecipeSteps(docSnap.data().steps);
    setCategories(docSnap.data().categories);
  };

  useEffect(() => {
    setRecipe();
  }, []);

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
          editRecipe(ret);
        });
      });
    } else {
      editRecipe(null);
    }
  };

  let navigate = useNavigate();

  const editRecipe = async (url) => {
    console.log(url);
    //await uploadToFirebase()
    console.log(recipeSteps);
    if (url) {
      await setDoc(
        recipesCollectionRef,
        {
          title: recipeTitle,
          recipeText: ingredients,
          steps: recipeSteps,
          imgURL: url,
          categories: categories,
        },
        { merge: true }
      );
    } else {
      await setDoc(
        recipesCollectionRef,
        {
          title: recipeTitle,
          recipeText: ingredients,
          steps: recipeSteps,
          categories: categories,
        },
        { merge: true }
      );
    }

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
    <div
      className="createRecipePage"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <div
        className="cpContainer"
        style={{ backgroundColor: theme.textboxColor }}
      >
        <h1 style={{ color: theme.color }}>Edit Recipe</h1>
        <div className="inputGp">
          <label style={{ color: theme.color }}> Recipe Title:</label>
          <input
            value={recipeTitle}
            onChange={(event) => {
              setRecipeTitle(event.target.value);
            }}
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
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
        <InputIngredients
          ingredientsList={ingredients}
          setIngredientsList={setIngredients}
        />
        {/*  */}
        <div className="inputGp">
          <label style={{ color: theme.color }}> Steps:</label>
          <textarea
            value={recipeSteps}
            style={{
              backgroundColor: theme.backgroundColor,
              color: theme.color,
            }}
            onChange={(event) => {
              setRecipeSteps(event.target.value);
            }}
          />
        </div>
        <Categories color={theme.color} ccategoriesList={categories} setCategoryList={setCategories} />
        <input
          style={{ color: theme.color }}
          type="file"
          accept="image/x-png,image/jpeg"
          onChange={(e) => {
            onImageChange(e);
          }}
        />
        <button onClick={uploadRecipe} disabled={recipeTitle === ""}>
          {" "}
          Save recipe
        </button>
      </div>
    </div>
  );
}
