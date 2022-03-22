import React from "react";
import { useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useEffect, useState } from "react";
import { ThemeContext } from "../contexts/theme";

import "./InputIngredients.css";

export default function InputIngredients({ ingredientsList, setIngredientsList }) {

  const [{ theme }] = useContext(ThemeContext);

  return (
    <div className="inputIng">
      <label style={{color: theme.color}}> Ingredients:</label>
      <p style={{color:theme.color, margin:"0px", fontSize: "14px"}}>Press "Enter" to add more ingredients. Press "Backspace" to delete.</p>
      {ingredientsList.map((ingredient, index) => {
        return (
          <textarea
            value={ingredient}
            autoFocus="autofocus"
            style={{backgroundColor: theme.backgroundColor, color: theme.color}}
            onKeyDown={(event) => {
              if (
                event.code == "Enter" &&
                ingredientsList[ingredientsList.length - 1] != ""
              ) {
                let temp = [...ingredientsList];
                temp.push("");
                setIngredientsList(temp);
              }
              if (event.key == "Backspace" && ingredientsList[index] == "" && ingredientsList.length > 1) {
                let temp = [...ingredientsList];
                temp.splice(index, 1);
                setIngredientsList(temp);
              }
            }}
            onChange={(event) => {
              if (event.target.value.charAt(event.target.value.length - 1) != "\n") {
                let temp = [...ingredientsList];
                temp[index] = event.target.value;
                setIngredientsList(temp);
              }
            }}
          />
        );
      })}
    </div>
  );
}
