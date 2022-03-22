import { Link } from "react-router-dom";

import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faUser } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { AuthContext } from "../App";
import styles from "./Nav.css";
import logo from "./../logo2.png";
import { ThemeContext } from "../contexts/theme";
import { IconButton } from "@mui/material";
import { Brightness5, Brightness7 , Brightness4 } from "@mui/icons-material/";

export default function Nav() {
  const user = useContext(AuthContext);
  const [{ isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <div className="navBar">
      <nav className="nav">
        <Link to="/"><img className="logo" src={logo} alt="Logo" /></Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/"> Feed </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {user === null ? (
          <></>
        ) : (
          <>
            <Link to="/createrecipe"> Create Recipe </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/likedrecipes"> Liked Recipes </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/myrecipes"> My Recipes </Link>
            &nbsp;&nbsp;&nbsp;
          </>
        )}
        {/** Endret til MUI-knapp
        <button className="darkmode" onClick={toggleTheme}> 
          <FontAwesomeIcon icon={!isDark ? faMoon : faSun} /> 
        </button>
        */}
        <IconButton className="darkButton" onClick={toggleTheme}>
          {!isDark ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Link className="pb" to="/profilepage">
          {" "}
          <IconButton>
          <FontAwesomeIcon icon={faUser} />{" "}
          </IconButton>
        </Link>
      </nav>
    </div>
  );
}
