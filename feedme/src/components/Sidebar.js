import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useContext } from "react";
import { AuthContext } from "../App";
import "./Sidebar.css";
import Categories from "./Categories";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ categoriesList, setCategoryList }) {
  //const [categories, setCategories] = useState([]); 
  const user = useContext(AuthContext);

  useEffect(() => {   
  }, [categoriesList]);
  
  return (
    <div className="sidenav">
      Select category to filter recipes: 
      <br/>
      <br/>
      <Categories categoriesList={categoriesList} setCategoryList={setCategoryList} />
    </div>
  );
}
