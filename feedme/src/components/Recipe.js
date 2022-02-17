import React from "react";
import DeleteRecipe from "./DeleteRecipe";
import RecipeLike from "./RecipeLike";

export default function Recipe({ recipe, triggerUpdate }) {
  return (
    <div className="recipe" key={recipe.id}>
      <div className="recipeHeader">
        <div className="title">
          <h1> {recipe.title}</h1>
        </div>
        <DeleteRecipe
          recipe={recipe}
          triggerUpdate={triggerUpdate}
        />
      </div>

      <b>Ingredients: </b>
      <div className="recipeIngredientContainer"> {recipe.steps} </div>
      <b> Steps: </b>
      <div className="recipeTextContainer"> {recipe.recipeText} </div>
      <h3>@{recipe.author.name}</h3>
      <RecipeLike recipe={recipe} triggerUpdate={triggerUpdate} />
    </div>
  );
}
