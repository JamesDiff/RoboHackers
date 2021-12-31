import React from "react";
import { updateUser } from '../api';
import { useState, useEffect } from "react";

const EditUser = ({token, user}) => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');

    console.log("USER FROM EDITUSER", user)

    useEffect(() => {
        if (token) {
            console.log("user is:", {user} )
        }
    }, [token]);

    return (
        
        <div className="row">
            <div id="account-box" className="form-group centered w-100">
                <br />
                    <div className="centered shadow-lg">
                                <h1>
                                    <b>EDIT CONTACT</b>
                                </h1>
                    </div>
            </div>

            <form
            onSubmit={(event) => {
            event.preventDefault();
            const post = {
                firstname: firstname, 
                lastname: lastname, 
                email: email, 
                street: street, 
                city: city, 
                state: state, 
                zip: zip, 
                phone: phone
            }
            updateUser()
            }}>

        <br />

    <div className="row">
        <div className="col">
                    <label htmlFor="firstnameinput" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstnameinput" placeholder="first name" value={firstname}
                        onChange={({target: {value}}) => setFirstName(value)} />
            </div>
            
            <div className="col">
                    <label htmlFor="lastnameinput" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastnameinput" placeholder="last name" value={lastname}
                        onChange={({target: {value}}) => setLastName(value)} />
            </div>
    </div>
    
            <div className="form-group">
                    <label htmlFor="emailinput" className="form-label">Email</label>
                    <input type="text" className="form-control" id="emailinput" placeholder="email"  value={email}
                        onChange={({target: {value}}) => setEmail(value)} />
            </div>
            <div className="form-group">
                    <label htmlFor="streetinput" className="form-label">Street</label>
                    <input type="text" className="form-control" id="streetinput" placeholder="street"  value={street}
                        onChange={({target: {value}}) => setStreet(value)} />
            </div>
    <div className="row">
            <div className="col">
                    <label htmlFor="cityinput" className="form-label">City</label>
                    <input type="text" className="form-control" id="cityinput" placeholder="city"  value={city}
                        onChange={({target: {value}}) => setCity(value)} />
            </div>
            <div className="col">
                    <label htmlFor="stateinput" className="form-label">State</label>
                    <input type="text" className="form-control" id="stateinput" placeholder="state"  value={state}
                        onChange={({target: {value}}) => setState(value)} />
            </div>
            <div className="col">
                    <label htmlFor="zipinput" className="form-label">ZIP code</label>
                    <input type="text" className="form-control" id="zipinput" placeholder="zip code"  value={zip}
                        onChange={({target: {value}}) => setZip(value)} />
            </div>
    </div>
            <div className="form-group">
                    <label htmlFor="phoneinput" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phoneinput" placeholder="phone number"  value={phone}
                        onChange={({target: {value}}) => setPhone(value)} />
            </div>
            
                <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
        
    </form>
</div>

    )
}


export default EditUser;