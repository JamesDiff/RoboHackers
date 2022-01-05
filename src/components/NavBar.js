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
            <div className="d-flex justify-content-between p-3 centered">
                <div className="collapse navbar-collapse fs-3" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* <Link className="nav-link active" aria-current="page" to="/"><b className="btn-primary">Home</b></Link> */}
                        <Link className="nav-link active" to="/products"><b className="btn-primary">All Products</b></Link>
                        <Link className="nav-link active" to="/account"><b className="btn-primary">My Account</b></Link>
                        <Link className="nav-link active" to="/cart"><b className="btn-primary">Cart</b></Link>
                        {isAdmin ? <Link className="nav-link active" style={{ color: 'orangered' }} to="/admin">
                                        <b className="btn-danger">
                                            Admin Page
                                        </b>
                                    </Link> : null}
                        {(!token ? <Link className="nav-link active" to="/login"><b className="btn-primary">Log In</b></Link> : 
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
                        }}><b className="btn-primary">Log Out</b></Link>)}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;