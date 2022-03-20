import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import "./Recipes.css";
import "./CreateRecipe";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";

import { useContext } from "react";
import { AuthContext } from "../App";

export default function MyRecipes() {
  const [postLists, setPostList] = useState([]);
  const [categoriesList, setCategoryList] = useState([]);
  const user = useContext(AuthContext);

  const getMyPosts = async () => {
    let q; 
    if (categoriesList.length == 0) {
      q = query(
        collection(db, "recipes"),
        where("author.id", "==", user.uid)
      );
    } else {
      q = query(
        collection(db, "recipes"),
        where("categories", "array-contains-any", categoriesList), 
        where("author.id", "==", user.uid)
      );
    }
    const data = await getDocs(q);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getMyPosts();
  }, [categoriesList]);

  return (
    <div className="homePage">
       <Sidebar categoriesList={categoriesList} setCategoryList={setCategoryList} />  
      {postLists.length === 0 ? <h1>You have not created any recipes yet ... </h1> :
      postLists.map((recipe) => {
        return <Recipe recipe={recipe} triggerUpdate={getMyPosts}/> 
      })}
    </div>
  );
}