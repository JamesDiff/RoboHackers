import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { loginUser } from "../api";

// This component takes us to the login page for a registered user.
// On success a token will be given and stored in localStorage.
// User must confirm their password in order to log in successfully.
const Login = ({ setToken, match, history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    return(
        <form
            onSubmit={(event) => {
                event.preventDefault();
                
                // if (match.url === "/register") {
                //     registerNewUser(setToken, username, password, confirmedPassword)};
                //     history.push("/login")
                // if (match.url === "/login") {
                    console.log(email, password, confirmedPassword);
                    loginUser(email, password, setToken);
                    history.push("/products")
            }
        }>
            <div className="form-group">
                    <label>Email</label>
                    <input 
                        onChange={({target: {value}}) => setEmail(value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter your Email" 
                        required 
                    />
            </div>

            <div className="form-group">
                    <label>Password</label>
                    <input 
                        onChange={({target: {value}}) => setPassword(value)} 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        required 
                    />
            </div>
            {
                match.url === "/register" ?
            
                (<div className="form-group">
                    <label>Verify Password</label>
                    <input 
                        onChange={({target: {value}}) => setConfirmedPassword(value)} 
                        type="password"
                        value={confirmedPassword} 
                        className="form-control" 
                        placeholder="Verify password" 
                        required 
                    />
                </div>) : null}

                <button 
                    type="submit" 
                    className="btn btn-primary btn-dark btn-lg btn-block">
                        Login
                </button>
            {/* {
                match.url === "/register" ?
                (<Link to="login"> Already have an account?</Link>) : 
                 <Link to="register"> Don't have an account?</Link>
            } */}
        </form>
    )
}

// This component logs out a registered logged-in user and removes token from localStorage. 
// Pushes user back to /login page.
const Logout = ({ token, setToken, history }) => {

    return(
        <button
            onClick={(event) => {
                const storageToken = token;
                console.log("storage token is:", storageToken)
                
                if (storageToken) {
                    localStorage.removeItem("token");
                    setToken(null);
                    alert('You are now logged out.');
                    history.push("/login");
                    }
            }} 
            type="submit"
            className="btn btn-primary btn-dark btn-lg btn-block">
                Logout
        </button>
    )
}

export { Login, Logout };
