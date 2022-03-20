import React from "react";
import DeleteRecipe from "./DeleteRecipe";
import RecipeLike from "./RecipeLike";
import './Recipe.css'

export default function Recipe({ recipe, triggerUpdate }) {
  return (
    <div className="recipe" key={recipe.id}>
      <img className="recipeImg" src={recipe.imgURL} alt=""/>
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
      <div className="recipeIngredientContainer"> {recipe.recipeText.map((ing) => {return (<>{ing}<br/></>)})} </div>
      
      <b> Steps: </b>
      <div className="recipeTextContainer"> {recipe.recipeText} </div>

      <b>Categories: <br/></b>
      {recipe.categories}

      {recipe.author.id === null  && (<h3 style={{color:'gray'}}>@NON-EXISTING USER</h3>)}
      {recipe.author.id !== null && (<h3>@{recipe.author.name}</h3>)}  
      <RecipeLike recipe={recipe} triggerUpdate={triggerUpdate} />
    
    </div>
  );
} 
