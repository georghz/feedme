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
      {ingredientsList.map((ingredient, index) => {
        return (
          <textarea
            value={ingredient}
            autoFocus="autofocus"
            onKeyPress={(event) => {
              if (
                event.code == "Enter" &&
                ingredientsList[ingredientsList.length - 1] != ""
              ) {
                let temp = [...ingredientsList];
                temp.push("");
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
