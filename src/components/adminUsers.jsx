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

    return (<div id="product-box" className="form-group centered w-75">
                <br />
                <Link to="/admin" className='btn btn-primary btn-danger m-3'>
                    GO BACK
                </Link>
                <br />
                <div id="product" className="container">
                    <h1 className="text-center">
                        <b style={{ color: 'dodgerblue' }}>*** ALL REGISTERED USERS ***</b>
                    </h1>
                    <br />
                    {users.map((user, index) => {
            
                        return (
                            
                            <div key={index} className="card w-75 p-3 border-dark m-3 shadow bg-body rounded">
                                <div className="form-group list-group-item-info card-title centered">
                                    <h3 className="card-title">
                                            <b>{ user.firstname + " " + user.lastname}</b> 
                                    </h3>
                                </div>
                                <div className="horizGroup">
                                    <div className="w-75">
                                    <div className="form-group">
                                            <b>ID #</b>{user.id }
                                        </div>
                                        <div className="form-group">
                                            <b>Email:</b> {user.email }
                                        </div>
                                        <div className="form-group">
                                            <b>Street:</b> {user.street }
                                        </div>
                                        <div className="form-group">
                                            <b>City:</b> {user.city }
                                        </div>
                                        <div className="form-group">
                                            <b>State:</b> {user.state }
                                        </div>
                                        <div className="form-group">
                                            <b>Zipcode:</b> {user.zip }
                                        </div>
                                        <div className="form-group">
                                            <b>Phone:</b> {user.phone }
                                        </div>
                                        {(user.is_admin === true) ? <div className="form-group list-group-item-text text-danger">
                                            <b>* ADMIN *</b>
                                        </div> : null}
                                        <br />
                                        <div className="form-group">
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
                                    
                                                type="submit" className="btn btn-primary btn-danger m-3">DELETE</button>
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