import React from "react";
import { Link} from 'react-router-dom';

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
                        <Link className="nav-link active" aria-current="page" to="/"><b className="shadow">Home</b></Link>
                        <Link className="nav-link active" to="/products"><b className="shadow">All Products</b></Link>
                        <Link className="nav-link active" to="/account"><b className="shadow">My Account</b></Link>
                        <Link className="nav-link active" to="/cart"><b className="shadow">Cart</b></Link>
                        {isAdmin ? <Link className="nav-link active" style={{ color: 'orangered' }} to="/admin">
                                        <b className="shadow">
                                            Admin Page
                                        </b>
                                    </Link> : null}
                        {(!token ? <Link className="nav-link active" to="/login"><b className="shadow">Log In</b></Link> : 
                            <Link className="nav-link active" to="/login" onClick={(event) => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                localStorage.removeItem("isAdmin");
                                localStorage.removeItem("ActiveOrderId");
                                setToken("");
                                setIsAdmin(false);
                                setUser(null);
                        }}><b className="shadow">Log Out</b></Link>)}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;