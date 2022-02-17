
import "./Recipes.css";

import React, { useEffect, useState } from "react";

import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

import Recipe from "../components/Recipe";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Recipes() {
  const [recipeLists, setRecipeList] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  const getRecipes = async () => {
    const data = await getDocs(recipesCollectionRef);
    setRecipeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getRecipes();
  }, []);  

  return (
    <div className="homePage">
      {recipeLists.map((recipe) => {
        return (
          <Recipe recipe={recipe} triggerUpdate={getRecipes}/>
        );
      })}
    </div>
  );
}

export default Recipes;