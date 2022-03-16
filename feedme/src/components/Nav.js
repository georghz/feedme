import { Link } from "react-router-dom";

import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { AuthContext } from "../App";
import styles from "./Nav.css";
import logo from "./../logo2.png";

export default function Nav() {
  const user = useContext(AuthContext);

  return (
    <div className="navBar">
      <nav className="nav">
        <img className="logo" src={logo} alt="Logo" />
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
        <Link className="pb" to="/profilepage">
          {" "}
          <FontAwesomeIcon icon={faUser} />{" "}
        </Link>
      </nav>
    </div>
  );
}
