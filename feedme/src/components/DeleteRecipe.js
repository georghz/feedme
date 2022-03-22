import React from "react";
import { useContext, } from 'react'
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { IconButton } from "@mui/material";
import { ThemeContext } from "../contexts/theme";

import { AuthContext } from "../App";
import { DeleteForever } from "@mui/icons-material";

export default function DeleteRecipe({ recipe, triggerUpdate }) {
  const user = useContext(AuthContext);
  const [{ theme, isDark }] = useContext(ThemeContext);


  const deletePost = async (id) => {
    const postDoc = doc(db, "recipes", id);
    await deleteDoc(postDoc).then(() => {
      triggerUpdate();
    });
  };

  return (
    <div className="deletePost">
      {user && recipe.author.id === user?.uid && (
        <IconButton
          onClick={() => {
            deletePost(recipe.id);
          }}
        >
          <DeleteForever sx={{color: theme.color}}></DeleteForever>
        </IconButton>
      )}
    </div>
  );
}
