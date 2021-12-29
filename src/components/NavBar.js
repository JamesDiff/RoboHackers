import React from "react";
import { Link} from 'react-router-dom';
import { saveOrderToUser } from "../api";

const NavBar = ({token, 
                    setToken, 
                    isAdmin,
                    setUser,
                    setIsAdmin}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="d-flex justify-content-between p-3">
                <div className="collapse navbar-collapse fs-3" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link active" to="/products">All Products</Link>
                        <Link className="nav-link active" to="/account">My Account</Link>
                        <Link className="nav-link active" to="/cart">Cart</Link>
                        {isAdmin ? <Link className="nav-link active" style={{ color: 'darkorange' }} to="/admin">
                                        <b>
                                            Admin Page
                                        </b>
                                    </Link> : null}
                        {(!token ? <Link className="nav-link active" to="/login">Log In</Link> : 
                            <Link className="nav-link active" to="/login" onClick={(event) => {
                                const activeOrderId = localStorage.getItem("ActiveOrderId")
                                if(activeOrderId){
                                    saveOrderToUser(token, activeOrderId);
                                }
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                localStorage.removeItem("isAdmin");
                                localStorage.removeItem("ActiveOrderId");
                                setToken("");
                                setIsAdmin(false);
                                setUser(null);
                        }}>Log Out</Link>)}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;