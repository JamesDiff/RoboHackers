import React from "react";
import { useState } from "react";
import { registerUser } from "../api";

// The register component is a form where a new user can enter a first and last name, password, and they must verify their password. 
// All fields are required.
// Once the user fills out form and hits register button, their info will now be authorized and it will push them to the login page where they must login to the site.

const Billing = ({ setToken, setUser, setIsAdmin, history }) => {

    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState(null);

    return(
        
        <form
            className="centered m-3 w-100" 
            onSubmit={async (event) => {
            event.preventDefault();
            try {
                await registerUser(setToken, setUser, setIsAdmin, firstname, lastname, password, verifyPassword, email, street, city, state, zip, phone);
                history.push("/products")
            }
            catch (error) {
                console.error('ERROR with submission for registering a new user!!! 🤦‍♂️');
                throw error;
            }
        }}>
            {/* <div className='form-group centered'>
                    <div className="">
                        <img src="https://www.freeiconspng.com/thumbs/sign-up-button-png/sign-up-now-button-png-14.png"
                            style={{width: 400, height: 75}}
                            alt="Register"
                            className="" />
                    </div>
                </div> */}
                <div className='form-group centered' font='Times'>
                    <h1>Register</h1>
                </div>
                <div className="form-group w-50">
                    <label><b >First Name</b></label>
                    <br></br>
                    <input onChange={(event) => setFirstname(event.target.value)} type="text" className="form-control" placeholder="First name" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >Last Name</b></label>
                    <br></br>
                    <input onChange={(event) => setLastname(event.target.value)} type="text" className="form-control" placeholder="Last name" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >Password</b></label>
                    <br></br>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" placeholder="Enter password" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >Verify Password</b></label>
                    <br></br>
                    <input onChange={(event) => setVerifyPassword(event.target.value)} type="password" className="form-control" placeholder="Verify password" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >Email address</b></label>
                    <br></br>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" placeholder="Email address" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >Street address</b></label>
                    <br></br>
                    <input onChange={(event) => setStreet(event.target.value)} type="text" className="form-control" placeholder="Street address" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >City</b></label>
                    <br></br>
                    <input onChange={(event) => setCity(event.target.value)} type="text" className="form-control" placeholder="City" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >State</b></label>
                    <br></br>
                    <input onChange={(event) => setState(event.target.value)} type="text" className="form-control" placeholder="State" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label><b >Zipcode</b></label>
                    <br></br>
                    <input onChange={(event) => setZip(event.target.value)} type="text" className="form-control" placeholder="Zipcode" required />
                    <br></br>
                </div>

                <div className="form-group w-50">
                    <label htmlFor="phone"><b >Phone Number</b></label>
                    <br></br>
                    <input onChange={(event) => setPhone(event.target.value)} type="tel" id="phone" name="phone" className="form-control" placeholder="555-555-5555" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                    <small>Format: 555-555-5555</small>
                    <br></br>
                </div>
                <br />

                <button type="submit" className="btn btn-primary btn-lg btn-block centered w-25 shadow">
                    Register
                </button>
                
            </form>
    )
}

export default Billing;