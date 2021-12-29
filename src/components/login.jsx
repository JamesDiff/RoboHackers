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
                    const orderId = localStorage.getItem("ActiveOrderId");
                    loginUser(email, password, setToken, 
                    setUser, 
                    setIsAdmin, orderId
                    );
                    history.push("/products");
            }
        }>
            <br />
            <div className='form-group centered'>
                    <div className="">
                        <img src="https://image.shutterstock.com/image-vector/vector-3d-gray-web-button-260nw-216786802.jpg"
                            style={{width: 600, height: 250}}
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
        </form>
    )
}

export { Login };
