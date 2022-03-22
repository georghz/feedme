import React, { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../App";
import { Button } from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { ThemeContext } from "../contexts/theme";

export default function RecipeLike({ recipe, triggerUpdate }) {
  const user = useContext(AuthContext);
  const [{ theme }] = useContext(ThemeContext);
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
      <Button
        variant="outlined"
        onClick={() => {
          handleLike(recipe.id);
        }}
        disabled={user === null}
        startIcon={
          checkIfAlreadyLiked ? <Favorite /> : <FavoriteBorderOutlined />
        }
        endIcon={recipe.likes}
        sx={{color: theme.color, borderColor: theme.color}}
      >
        {checkIfAlreadyLiked ? "   Unlike   " : "   Like   "}
      </Button>
    </div>
  );
}
