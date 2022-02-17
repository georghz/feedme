import React from "react";
import { useContext, } from 'react'
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

import { AuthContext } from "../App";

export default function DeleteRecipe({ recipe, triggerUpdate }) {
  const user = useContext(AuthContext);

  const deletePost = async (id) => {
    const postDoc = doc(db, "recipes", id);
    await deleteDoc(postDoc).then(() => {
      triggerUpdate();
    });
  };

  return (
    <div className="deletePost">
      {user && recipe.author.id === user.uid && (
        <button
          onClick={() => {
            deletePost(recipe.id);
          }}
        >
          {" "}
          &#128465;
        </button>
      )}
    </div>
  );
}
