import React from "react";
import { Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../api";

const AdminUsers = ({history}) => {

    const [users, setUsers] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const list = await getAllUsers();
            setUsers(list.users);
        } 
        catch (error) {
            console.error("ERROR fetching all users - useEffect in AdminUsers");
            throw error;
        }
    }



    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (<div id="product-box" className="form-group w-100">
                <br />
                <Link to="/admin" className='btn btn-primary btn-danger m-3'>
                    GO BACK
                </Link>
                <br />
                <div className="title shadow">
                    <h1 className="centered">
                        <b>ALL REGISTERED USERS</b>
                    </h1>
                </div>
                {/* <div className='d-flex justify-content-between p-3 w-100'>
                    <div className="">
                        <img src="https://www.computerhope.com/issues/pictures/users.png"
                            style={{width: 100, height: 75}}
                            alt="All Users" />
                    </div>
                    <div className="">
                        <img src="https://store-images.s-microsoft.com/image/apps.25871.53baf1fd-a88b-421e-96ea-18e584d3df32.2263e8ca-1f9f-4991-8937-d1c42f79ccc3.2fed0e10-4552-446e-b131-5cabd645b924.png"
                            style={{width: 450, height: 175}}
                            alt="All Users" />
                    </div>
                    <div className="">
                        <img src="https://cleanspeak.com/images/blog/User-Mngmt.png"
                            style={{width: 100, height: 125}}
                            alt="All Users" />
                    </div>
                </div> */}
                <div id="product" className="container centered">
                    
                    <br />
                    {users.map((user, index) => {
            
                        return (
                            
                            <div key={index} className="card w-50 p-3 border-dark m-3 shadow bg-body rounded">
                                <div className="form-group list-group-item card-title centered shadow">
                                    <h3 className="card-title">
                                            <b>{ user.firstname + " " + user.lastname}</b> 
                                    </h3>
                                </div>
                                <div className="horizGroup">
                                    <div className="w-75">
                                        {(user.is_admin === true) ? <div className="form-group list-group-item-text text-danger">
                                            <b className="shadow">*** ADMIN ***</b>
                                        </div> : null}
                                        <div className="form-group">
                                            <b className="shadow">ID #</b>{user.id }
                                        </div>
                                        <div className="form-group">
                                            <b className="shadow">Email:</b> {user.email }
                                        </div>
                                        <div className="form-group">
                                            <b className="shadow">Street:</b> {user.street }
                                        </div>
                                        <div className="form-group">
                                            <b className="shadow">City:</b> {user.city }
                                        </div>
                                        <div className="form-group">
                                            <b className="shadow">State:</b> {user.state }
                                        </div>
                                        <div className="form-group">
                                            <b className="shadow">Zipcode:</b> {user.zip }
                                        </div>
                                        <div className="form-group">
                                            <b className="shadow">Phone:</b> {user.phone }
                                        </div>
                                        <br />
                                        <div className="form-group centered">
                                            <button 
                                                onClick={async (event) => {
                                                    
                                                try {
                                            
                                                    const response = await deleteUser(user.id);
                                                    console.log(response)
                                                    history.push("/admin")
                                            
                                                }
                                                catch (err) {
                                                    console.error("trouble deleting user", err)
                                                }
                                                }} 
                                    
                                                type="submit" className="btn btn-primary btn-danger m-3 shadow w-50">DELETE</button>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                            </div>)
                    })}
                </div>
            </div>)




}

export default AdminUsers;