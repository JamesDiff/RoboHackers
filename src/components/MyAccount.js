import React from "react";
import { getUser } from '../api';
import { useState, useEffect } from "react";

/*AS A LOGGED-IN CUSTOMER, I WANT TO BE ABLE TO:
(see my order history so I can remember my previously purchased items and their prices at the time of purchase) -- need to have purchases set up first

view and edit my user profile so I can update my information when necessary.

Hide "My Account" when not logged in*/


const MyAccount = ({token}) => {

    const [myInfo, setMyInfo] = useState([]);

    const fetchMyUser = async (token, setMyInfo) => {
        try {
            const me = await getUser(token);
            setMyInfo([me]);
            

        } catch (error) {
            throw error;
        }
    }


    useEffect(() => {
        fetchMyUser(token, setMyInfo)
    }, [token]);

    return (
        <div>
        <h2>My Profile</h2>
            <div id="user-info">
                {myInfo.map((stuff, index) => {
                    return (
                        <div key={index}> 
                            <div>
                            {stuff.firstname } {stuff.lastname}
                            </div>
                                <div>
                                    {stuff.street}
                                </div>
                                    <div>
                                        {stuff.city} {stuff.state}
                                    </div>
                                            {stuff.zip} 
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default MyAccount;