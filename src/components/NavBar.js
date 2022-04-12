import React from "react";
import { Navbar, Container, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { saveOrderToUser } from "../api";

const NavBar = ({ token,
    setToken,
    isAdmin,
    setUser,
    setIsAdmin }) => {

    const handleClick = (event) => {
        const activeOrderId = localStorage.getItem("ActiveOrderId")
        if (activeOrderId) {
            saveOrderToUser(token, activeOrderId);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("ActiveOrderId");
        setToken("");
        setIsAdmin(false);
        setUser(null);
    }

return (
    <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container fluid>
            {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    // style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/products">All Products</Link></Nav.Link>
                    {/* <Nav.Link><Link to="/account">My Account</Link></Nav.Link> */}
                    <Nav.Link><Link to="/cart">My Cart</Link></Nav.Link>
                    {token ? <Nav.Link><Link to="/account">My Account</Link></Nav.Link> : null}
                    {isAdmin && <Nav.Link><Link to="/admin">Admin</Link></Nav.Link>}
                    {!token ? <Nav.Link><Link to="/login">Login</Link></Nav.Link> : <Nav.Link onClick = {handleClick}>Logout</Nav.Link>}

                    {/* <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form> */}

                </Nav>

            </Navbar.Collapse>
        </Container>
    </Navbar>
    // <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    //     <div className="d-flex justify-content-between p-3 centered">
    //         <div className="collapse navbar-collapse fs-3" id="navbarNavAltMarkup">
    //             <div className="navbar-nav">
    //                 {/* <Link className="nav-link active" aria-current="page" to="/"><b className="btn-primary">Home</b></Link> */}
    //                 <Link className="nav-link active" to="/products"><b className="btn-primary">All Products</b></Link>
    //                 {(token ? 
    //                 <Link className="nav-link active" to="/account"><b className="btn-primary">My Account</b></Link> : null)}
    //                 <Link className="nav-link active" to="/cart"><b className="btn-primary">Cart</b></Link>
    //                 {isAdmin ? <Link className="nav-link active" style={{ color: 'orangered' }} to="/admin">
    //                                 <b className="btn-danger">
    //                                     Admin Page
    //                                 </b>
    //                             </Link> : null}
    //                 {(!token ? <Link className="nav-link active" to="/login"><b className="btn-primary">Log In</b></Link> : 
    //                     <Link className="nav-link active" to="/login" onClick={(event) => {
    //                         const activeOrderId = localStorage.getItem("ActiveOrderId")
    //                         if(activeOrderId){
    //                             saveOrderToUser(token, activeOrderId);
    //                         }
    //                         localStorage.removeItem("token");
    //                         localStorage.removeItem("user");
    //                         localStorage.removeItem("isAdmin");
    //                         localStorage.removeItem("ActiveOrderId");
    //                         setToken("");
    //                         setIsAdmin(false);
    //                         setUser(null);
    //                 }}><b className="btn-primary">Log Out</b></Link>)}
    //             </div>
    //         </div>
    //     </div>
    // </nav>
)
}

export default NavBar;