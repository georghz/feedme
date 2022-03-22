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
import Nav from "./components/Nav";
import LikedRecipes from "./pages/LikedRecipes";
import MyRecipes from "./pages/MyRecipes";
import { ThemeContext } from "./contexts/theme";
import EditRecipe from "./pages/EditRecipe";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(true);
  const [{ theme }] = useContext(ThemeContext);
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []); // creates this listener once

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <Nav />
        <div
          className="app"
          style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
        >
        <Routes>
          <Route path="" element={<Recipes />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/likedrecipes" element={<LikedRecipes />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/editrecipe/:recipeID" element={<EditRecipe />}/>
        </Routes>

        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
