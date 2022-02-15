import React from 'react'
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export default function DeleteRecipe({post, isAuth, triggerUpdate}) {
    
    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc).then(() => {  
          triggerUpdate();
        });
      };
    
    return (
        <div className="deletePost">
        {isAuth && post.author.id === auth.currentUser.uid && (
          <button
            onClick={() => {
              deletePost(post.id);
            }}
          >
            {" "}
            &#128465;
          </button>
        )}
      </div>
    )
}
