import { Link } from "react-router-dom"

import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

import { useContext, } from 'react'
import { AuthContext } from "../App"

export default function Nav() {
    const user = useContext(AuthContext)
    
    const signUserOut = () => {
        signOut(auth).then(() => {
            window.location.pathname = "/login";
        });
    };
    
    return (
        <div className="navBar">
            <nav>
            <Link to="/"> Feed </Link>

            {(user === null) ? (
                <Link to="/login"> Login </Link>
            ) : (
                <>
                <Link to="/createrecipe"> Create Recipe </Link>
                <Link to="/likedrecipes"> Liked Recipes </Link>
                <button onClick={signUserOut}> Log Out</button>
                </>
            )}
            </nav>
        </div>
    )
}
