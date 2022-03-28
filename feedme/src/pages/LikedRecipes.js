import React, { useEffect, useState } from "react";
import "./Recipes.css";
import "./CreateRecipe";
import { useContext } from "react";
import { AuthContext } from "../App";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";
import { getAllRecipesLikedByUserFilteredByCategory } from "../services/RecipeService";

export default function LikedRecipes() {
  const [recipeList, setRecipeList] = useState([]);
  const [categoriesList, setCategoryList] = useState([]);
  const user = useContext(AuthContext);

  const getLikedPosts = async () => {
    if(user != undefined){
      getAllRecipesLikedByUserFilteredByCategory(user, categoriesList).then(
        (result) => {
          setRecipeList(result);
        }
      );
    }
  };

  useEffect(() => {
    getLikedPosts();
  }, [user, categoriesList]);

  return (
    <div className="homePage">
      <Sidebar
        categoriesList={categoriesList}
        setCategoryList={setCategoryList}
      />
      {recipeList.length === 0 ? (
        <h1 style={{textAlign: "center"}}>You have not liked any recipes yet ... </h1>
      ) : (
        recipeList.map((recipe, i) => {
          return (
            <Recipe recipe={recipe} triggerUpdate={getLikedPosts} key={i} />
          );
        })
      )}
    </div>
  );
}
