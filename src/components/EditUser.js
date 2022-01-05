import React from "react";
import { updateUser, getUser } from '../api';
import { useState, useEffect } from "react";

const EditUser = ({token, history}) => {
    const [userId, setUserId] = useState('');
    const [newfirstname, setFirstName] = useState('');
    const [newlastname, setLastName] = useState('');
    const [newemail, setEmail] = useState('');
    const [newstreet, setStreet] = useState('');
    const [newcity, setCity] = useState('');
    const [newstate, setState] = useState('');
    const [newzip, setZip] = useState('');
    const [newphone, setPhone] = useState('');


    async function getUserInfo(token) {
        const theUser = await getUser(token);
        setUserId(theUser.id)
    }

    useEffect(() => {
        if (token) {
            getUserInfo(token)
            setUserId(userId)
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
            updateUser(userId, newfirstname, newlastname, newemail, newstreet, newcity, newstate, newzip, newphone)
            history.push('/account')
            }}>

        <br />

    <div className="row">
        <div className="col">
                    <label htmlFor="firstnameinput" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstnameinput" placeholder="first name" value={newfirstname}
                        onChange={({target: {value}}) => setFirstName(value)} />
            </div>
            
            <div className="col">
                    <label htmlFor="lastnameinput" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastnameinput" placeholder="last name" value={newlastname}
                        onChange={({target: {value}}) => setLastName(value)} />
            </div>
    </div>
    
            <div className="form-group">
                    <label htmlFor="emailinput" className="form-label">Email</label>
                    <input type="text" className="form-control" id="emailinput" placeholder="email"  value={newemail}
                        onChange={({target: {value}}) => setEmail(value)} />
            </div>
            <div className="form-group">
                    <label htmlFor="streetinput" className="form-label">Street</label>
                    <input type="text" className="form-control" id="streetinput" placeholder="street"  value={newstreet}
                        onChange={({target: {value}}) => setStreet(value)} />
            </div>
    <div className="row">
            <div className="col">
                    <label htmlFor="cityinput" className="form-label">City</label>
                    <input type="text" className="form-control" id="cityinput" placeholder="city"  value={newcity}
                        onChange={({target: {value}}) => setCity(value)} />
            </div>
            <div className="col">
                    <label htmlFor="stateinput" className="form-label">State</label>
                    <input type="text" className="form-control" id="stateinput" placeholder="state"  value={newstate}
                        onChange={({target: {value}}) => setState(value)} />
            </div>
            <div className="col">
                    <label htmlFor="zipinput" className="form-label">ZIP code</label>
                    <input type="text" className="form-control" id="zipinput" placeholder="zip code"  value={newzip}
                        onChange={({target: {value}}) => setZip(value)} />
            </div>
    </div>
            <div className="form-group">
                    <label htmlFor="phoneinput" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phoneinput" placeholder="phone number"  value={newphone}
                        onChange={({target: {value}}) => setPhone(value)} />
            </div>
            
                <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
        
    </form>
</div>

    )
}


export default EditUser;