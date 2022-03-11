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
    const [loginError, setLoginError] = useState(false);

   

    return(
        <div className="d-flex w-100 justify-content-center">
            <form className="d-flex flex-column w-75"
            onSubmit={async (event) => {
                event.preventDefault();
                    console.log(email, password);
                    const orderId = localStorage.getItem("ActiveOrderId");
                    const loginResult = await loginUser(email, password, setToken, 
                    setUser, 
                    setIsAdmin, orderId
                    );
                    //this is probably where the conditional should go; if log in is successful, go to products. Otherwise, go to register page (or maybe display message)
                    if(loginResult === "Invalid credentials. Try again"){
                        setLoginError(true);
                    } else {
                        history.push("/products")
                    }
                }
        }>
            <br />
            <br />
            <br />
            <div className='form-group centered'>
                    <div className="">
                        <img src="https://emb.gov.ph/wp-content/uploads/2017/02/login-button-png-18028.png"
                            style={{width: 300, height: 50}}
                            alt="Login"
                            className="" />
                    </div>
                </div>
            <div className="form-group mb-3">
                    <label><h5><b className="shadow">Email</b></h5></label>
                    <input 
                        onChange={({target: {value}}) => setEmail(value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter your Email" 
                        required 
                    />
            </div>

            <div className="form-group mb-3">
                    <label><h5><b className="shadow">Password</b></h5></label>
                    <input 
                        onChange={({target: {value}}) => setPassword(value)} 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        required 
                    />
            </div>

            <button className="btn btn-primary btn-lg btn-block"
                type="submit">
                    Login
            </button>
            <div className="mb-3">                
                {(match.url === "/register" ?
                    <Link to="/login">Already a user? Login Here! </Link> 
                    :
                    <Link to="/register"><b className="shadow">Not a User? Register Here!</b></Link>
                )}
            </div>
            {loginError && <p>Invalid credentials. Try again or create an account</p>}
        </form>

        </div>
        
    )
}

export { Login };
