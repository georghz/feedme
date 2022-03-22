import "./Recipes.css";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";
import Categories from "../components/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Recipes() {
  const [recipeLists, setRecipeList] = useState([]);
  const [categoriesList, setCategoryList] = useState([]);

  const getRecipes = async () => {
    let q;
    if (categoriesList.length == 0) {
      q = collection(db, "recipes");
    } else {
      q = query(
        collection(db, "recipes"),
        where("categories", "array-contains-any", categoriesList)
      );
    }
    let data = await getDocs(q);
    setRecipeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getRecipes();
  }, [categoriesList]);

  return (
    <div className="homePage">
      <Sidebar categoriesList={categoriesList} setCategoryList={setCategoryList} />
      {recipeLists.map((recipe) => {
        return <Recipe recipe={recipe} triggerUpdate={getRecipes} />;
      })}
    </div>
  );
}

export default Recipes;