import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "./Recipes.css";
import "./CreateRecipe";
import { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";
import Recipe from "../components/Recipe";
import Sidebar from "../components/Sidebar";

export default function LikedRecipes() {
  const [postLists, setPostList] = useState([]);
  const [categoriesList, setCategoryList] = useState([]);
  const user = useContext(AuthContext);

  const getLikedPosts = async () => {
    let q;
    if (categoriesList.length == 0) {
      q = query(
        collection(db, "recipes"),
        where("likedBy", "array-contains", user?.uid)
      );
    } else {
      q = query(
        collection(db, "recipes"),
        where("categories", "array-contains-any", categoriesList)
      );
      const q2 = query(
        collection(db, "recipes"),
        where("likedBy", "array-contains", user?.uid)
      );
      // Firebase er veldig teite på å kombinere queries, så vi har et problem her. Får ikke kombinert og sjekke at
      // man viser de markerte kategoriene sine oppskrifter som også er innlogget bruker sine.

      /*const data1 = await getDocs(q);
      const data2 = await getDocs(q2);

      let data1Array = [];
      let bothArray = [];

      data1.docs.forEach((element) => {
        data1Array.push(element.id);
      });

      data2.docs.forEach((element) => {
        if (data1Array.indexOf(element.id)) {
          bothArray.push(element.id);
        }
      });
      console.log(bothArray);*/
    }

    const data = await getDocs(q);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getLikedPosts();
  }, [categoriesList]);

  return (
    <div className="homePage">
      <Sidebar
        categoriesList={categoriesList}
        setCategoryList={setCategoryList}
      />
      {postLists.length === 0 ? (
        <h1>You have not liked any recipes yet ... </h1>
      ) : (
        postLists.map((recipe) => {
          return <Recipe recipe={recipe} triggerUpdate={getLikedPosts} />;
        })
      )}
    </div>
  );
}
