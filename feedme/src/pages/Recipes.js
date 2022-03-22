import "./Recipes.css";
import React, { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";
import { getAllRecipesFilteredByCategory } from "../services/RecipeService";

function Recipes() {
  const [recipeLists, setRecipeList] = useState([]);
  const [categoriesList, setCategoryList] = useState([]);
  
  const getRecipes = () => {
    getAllRecipesFilteredByCategory(categoriesList).then((result) => {
      setRecipeList(result);
    });
  };

  useEffect(() => {
    getRecipes();
  }, [categoriesList]);

  return (
    <div className="homePage">
      <Sidebar
        categoriesList={categoriesList}
        setCategoryList={setCategoryList}
      />
      {recipeLists.map((recipe, i) => {
        return <Recipe recipe={recipe} triggerUpdate={getRecipes} key={i} />;
      })}
    </div>
  );
}

export default Recipes;