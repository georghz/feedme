import React, { useEffect, useState } from "react";
import "./Recipes.css";
import "./CreateRecipe";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";
import { getAllRecipesByUserFilteredByCategory } from "../services/RecipeService";
import { useContext } from "react";
import { AuthContext } from "../App";

export default function MyRecipes() {
  const [recipeList, setRecipeList] = useState([]);
  const [categoriesList, setCategoryList] = useState([]);
  const user = useContext(AuthContext);

  const getMyPosts = async () => {
    if (user != undefined) {
      getAllRecipesByUserFilteredByCategory(user, categoriesList).then(
        (result) => {
          setRecipeList(result);
        }
      );
    }
  };

  useEffect(() => {
    getMyPosts();
  }, [user, categoriesList]);

  return (
    <div className="homePage">
      <Sidebar
        categoriesList={categoriesList}
        setCategoryList={setCategoryList}
      />
      {recipeList.length === 0 ? (
        <h1 style={{textAlign: "center"}}>You have not created any recipes yet ... </h1>
      ) : (
        recipeList.map((recipe, i) => {
          return <Recipe recipe={recipe} triggerUpdate={getMyPosts} key={i} />;
        })
      )}
    </div>
  );
}
