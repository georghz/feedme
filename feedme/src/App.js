/** 
 * main App component
 * contains nav bare
 */

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

import Recipes from "./pages/Recipes";
import CreateRecipe from "./pages/CreateRecipe";
import ProfilePage from "./pages/ProfilePage";
import Nav from "./components/Nav"
import LikedRecipes from "./pages/LikedRecipes";
import MyRecipes from "./pages/MyRecipes";
import { ThemeContext } from "./contexts/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(true);
  const [{theme, isDark}, toggleTheme] = useContext(ThemeContext);
  console.log("theme", theme); 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {setUser(user)})
  }, []) // creates this listener once

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <Nav /> 
        <div
        className="app"
        style={{backgroundColor: theme.backgroundColor, color: theme.color}}>   
        <Routes>
          <Route path="" element={<Recipes />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/likedrecipes" element={<LikedRecipes />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
        </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;