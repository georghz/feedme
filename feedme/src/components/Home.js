import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "./Home.css";
import "./CreatePost"; 
import DeleteRecipe from "./DeleteRecipe";
import RecipeLike from "./RecipeLike";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getPosts();
  }, []);  
  
  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <DeleteRecipe post={post} isAuth={isAuth} triggerUpdate={getPosts}/>
            </div>
            <b>Ingredients: </b>
            <div className="postIngredientContainer"> {post.steps} </div>
            <b> Steps: </b>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
            <RecipeLike post={post}  triggerUpdate={getPosts} />
          </div>
        );
      })}
    </div>
  );
}

export default Home;