import React, { useContext} from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../App";

export default function RecipeLike({ recipe, triggerUpdate }) {
  const user = useContext(AuthContext);
  const checkIfAlreadyLiked = recipe.likedBy.includes(user?.uid);

  const handleLike = async (id) => {
    const postDoc = doc(db, "recipes", id);
    let likedByList = recipe.likedBy;
    let value = 0;
    if (checkIfAlreadyLiked) {
      const indexToBeRemoved = recipe.likedBy.indexOf(user?.uid);
      likedByList.splice(indexToBeRemoved, 1);
      value = -1;
    } else {
      likedByList = [...recipe.likedBy, user?.uid];
      value = 1;
    }
    updateDoc(postDoc, {
      ...recipe,
      likes: recipe.likes + value,
      likedBy: likedByList,
    }).then(() => {
      triggerUpdate();
    });
  };

  return (
    <div className="likeContainer">
      <button
        onClick={() => {
          handleLike(recipe.id);
        }}
        disabled={user === null}
      >
        <FontAwesomeIcon
          icon={checkIfAlreadyLiked ? faThumbsDown : faThumbsUp}
        />
        {checkIfAlreadyLiked ? " Unlike" : " Like"}
      </button>{" "}
      {recipe.likes}
    </div>
  );
}
