import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useContext } from "react";
import { AuthContext } from "../App";
import "./Sidebar.css";
import Categories from "./Categories";

export default function Sidebar({ recipesList, setRecipeList }) {
 // const [dinnerChecked, setDinnerChecked] = React.useState(false);
  const [categories, setCategories] = useState([]);

  const user = useContext(AuthContext);

  const handleDinnerChange = () => {

    //setDinnerChecked(!dinnerChecked);
    getMyPosts();
    // recipesList = [];
    // console.log(recipesList)
    // console.log("anine");
  }; 

  const hei = () => {
    console.log("Hei på deg");
  }

  const getMyPosts = async () => {
    console.log("Nå kjører dinnerchange")
    
   // console.log(Object.values(categories));
  /*  Object.values(categories).forEach(category => {
      console.log(category);
      const q = query(
        collection(db, "recipes"),
        where("categories", "array-contains", category)
      );
      const data =  getDocs(q);
      setRecipeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });*/
    const q = query(
      collection(db, "recipes"),
      where("categories", "array-contains", "dinner")
    );
    const data = await getDocs(q);
    setRecipeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    
  };

  useEffect(() => {
    getMyPosts(); 
  }, []);


  return (
    <div className="sidebar">
      <Categories categoriesList={categories} setCategoryList={setCategories}/>
    </div>
  );
}
