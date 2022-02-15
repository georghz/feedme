import { useContext, } from 'react'
import { Link } from "react-router-dom"

import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

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
            <Link to="/"> Home </Link>

            {(user === null) ? (
                <Link to="/login"> Login </Link>
            ) : (
                <>
                <Link to="/createrecipe"> Create Post </Link>
                <button onClick={signUserOut}> Log Out</button>
                </>
            )}
            </nav>
        </div>
    )
}
