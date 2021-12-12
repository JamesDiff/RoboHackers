import React from "react";
import { useState } from "react";
import { registerUser } from "../api";

// The register component is a form where a new user can enter a first and last name, password, and they must verify their password. 
// All fields are required.
// Once the user fills out form and hits register button, their info will now be authorized and it will push them to the login page where they must login to the site.

const Register = ({ setToken, history }) => {

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
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await registerUser(setToken, firstname, lastname, password, verifyPassword, email, street, city, state, zip, phone);
                history.push("/products")
            }
            catch (error) {
                console.error('ERROR with submission for registering a new user!!! 🤦‍♂️');
                throw error;
            }
        }}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First Name</label>
                    <br></br>
                    <input onChange={(event) => setFirstname(event.target.value)} type="text" className="form-control" placeholder="First name" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <br></br>
                    <input onChange={(event) => setLastname(event.target.value)} type="text" className="form-control" placeholder="Last name" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <br></br>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" placeholder="Enter password" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>Verify Password</label>
                    <br></br>
                    <input onChange={(event) => setVerifyPassword(event.target.value)} type="password" className="form-control" placeholder="Verify password" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <br></br>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" placeholder="Email address" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>Street address</label>
                    <br></br>
                    <input onChange={(event) => setStreet(event.target.value)} type="text" className="form-control" placeholder="Street address" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>City</label>
                    <br></br>
                    <input onChange={(event) => setCity(event.target.value)} type="text" className="form-control" placeholder="City" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>State</label>
                    <br></br>
                    <input onChange={(event) => setState(event.target.value)} type="text" className="form-control" placeholder="State" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label>Zipcode</label>
                    <br></br>
                    <input onChange={(event) => setZip(event.target.value)} type="text" className="form-control" placeholder="Zipcode" required />
                    <br></br>
                </div>

                <div className="form-group">
                    <label for="phone" >Phone Number</label>
                    <br></br>
                    <input onChange={(event) => setPhone(event.target.value)} type="tel" id="phone" name="phone" className="form-control" placeholder="555-555-5555" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                    <br></br>
                    <small>Format: 555-555-5555</small>
                    <br></br>
                </div>

                <button type="submit" className="btn btn-primary btn-dark btn-lg btn-block">
                    Register
                </button>
                
            </form>
    )
}

export default Register;