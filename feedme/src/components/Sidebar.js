import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../App";
import "./Sidebar.css";
import Categories from "./Categories";

export default function Sidebar({ categoriesList, setCategoryList }) {
  const user = useContext(AuthContext);

  useEffect(() => {   
  }, [categoriesList]);
  
  return (
    <div className="sidenav">
      <br/>
      <br/>
      Select category to filter recipes: 
      <br/>
      <br/>
      <Categories categoriesList={categoriesList} setCategoryList={setCategoryList} />
    </div>
  );
}
