import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export default function RecipeLike({ post, triggerUpdate }) {
    const isAuth = localStorage.getItem("isAuth");
    const loggedInUserId = auth.currentUser?.uid;
    const checkIfAlreadyLiked = post.likedBy.includes(loggedInUserId);

    const handleLike = async (id) => {
        const postDoc = doc(db, "posts", id);    
        let likedByList = post.likedBy;
        console.log(likedByList)
        let value = 0;
        if (checkIfAlreadyLiked) {
            const indexToBeRemoved = post.likedBy.indexOf(loggedInUserId);
            console.log(indexToBeRemoved);
            likedByList.splice(indexToBeRemoved, 1);
            console.log(likedByList);
            value = -1;
        } else {
          likedByList = [...post.likedBy, loggedInUserId];
          value = 1;
        }
        updateDoc(postDoc, {...post, likes: post.likes + value, likedBy: likedByList}).then(() => {
            triggerUpdate();
        });
    };  

    return (
        <div className="likeContainer"><button onClick={() => {
            handleLike(post.id);
          }} disabled={!isAuth}><FontAwesomeIcon icon={checkIfAlreadyLiked ? faThumbsDown : faThumbsUp}/>
          {checkIfAlreadyLiked ? " Unlike" : " Like"}</button> {post.likes}
        </div>
    )
}