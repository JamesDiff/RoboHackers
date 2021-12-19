import React from "react";
import { useState } from "react";
import { loginUser } from "../api";
import { Link } from "react-router-dom";

// This component takes us to the login page for a registered user.
// On success a token will be given and stored in localStorage.
// User must confirm their password in order to log in successfully.
const Login = ({ setToken, 
    setUser, 
    setIsAdmin, 
    history, 
    match }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <form className="m-3 w-50 position-absolute top-50 start-50 translate-middle"
            onSubmit={(event) => {
                event.preventDefault();
                    console.log(email, password);
                    loginUser(email, password, setToken, 
                    setUser, 
                    setIsAdmin
                    );
                    // alert('You are now logged in!');
                    history.push("/products");
            }
        }>
            <div className="form-group mb-3">
                    <label>Email</label>
                    <input 
                        onChange={({target: {value}}) => setEmail(value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter your Email" 
                        required 
                    />
            </div>

            <div className="form-group mb-3">
                    <label>Password</label>
                    <input 
                        onChange={({target: {value}}) => setPassword(value)} 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        required 
                    />
            </div>

            <button className="btn btn-primary btn-dark btn-lg btn-block"
                type="submit">
                    Login
            </button>
            <div className="mb-3">                
                {(match.url === "/register" ?
                    <Link to="/login">Already a user? Login Here! </Link> 
                    :
                    <Link to="/register">Not a User? Register Here! </Link>
                )}
            </div>
        </form>
    )
}

// This component logs out a registered logged-in user and removes token from localStorage. 
// Pushes user back to /login page.
const Logout = ({ token, setToken, setUser, setIsAdmin, history }) => {

    return(
        <button
            // onClick={(event) => {
            //     logoutUser();
            //     setUser({});
            //     setIsAdmin(false);
            //     setToken(null);
            //     history.push("/");
            // }}
            onClick={(event) => {
                // const storageToken = token;
                // const admin = user.is_admin;
                // const currentUser = user;
                setIsAdmin(null);
                setUser(null);
                localStorage.clear();
                // sessionStorage.clear();           
                // if (storageToken) {
                //     localStorage.removeItem("token");
                //     // localStorage.removeItem("isAdmin");
                //     // localStorage.removeItem("user");
                //     setToken(null);
                    
                    
                //     alert('You are now logged out.');
                //     history.push("/");
                // }
            }} 
            type="submit"
            className="btn btn-primary btn-dark btn-lg btn-block">
                Logout
        </button>
    )
}

export { Login, Logout };
