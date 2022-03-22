import React from "react";
import { useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useEffect, useState } from "react";

import "./InputIngredients.css";

export default function InputIngredients({ ingredientsList, setIngredientsList }) {

  return (
    <div className="inputIng">
      <label> Ingredients:</label>
      <p style={{color:"gray", margin:"0px", fontSize: "14px"}}>Press "Enter" to add more ingredients. Press "Backspace" to delete.</p>
      {ingredientsList.map((ingredient, index) => {
        return (
          <textarea
            value={ingredient}
            autoFocus="autofocus"
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
