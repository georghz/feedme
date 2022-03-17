/** 
 * main App component
 * contains nav bare
 */

import "./App.css";

import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";

import Recipes from "./pages/Recipes";
import CreateRecipe from "./pages/CreateRecipe";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav"
import LikedRecipes from "./pages/LikedRecipes";
import MyRecipes from "./pages/MyRecipes";
import EditRecipe from "./pages/EditRecipe";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {setUser(user)})
  }, []) // creates this listener once

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <Nav />
        <Routes>
          <Route path="" element={<Recipes />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/likedrecipes" element={<LikedRecipes />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/editrecipe/:recipeID" element={<EditRecipe />}
        />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;