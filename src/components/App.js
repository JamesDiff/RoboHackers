import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { 
  Register,
  Login, 
  Logout, 
  AllProducts, 
  Title,
  SingleProductView,
  NavBar,
  AdminPage,
  AdminProducts,
  AdminUsers
 } from '../components';
import CreateForm from './createProduct';
import { getUser } from '../api';
// import AdminProducts from './adminProducts';






const App = () => {
  // Need to figure out the whole message thing, but i don't even think we need to use it at all.
  // const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(null);


  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });



  // As soon as page hits we will grab the current logged in users token and set it on state.
  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    const currentUser = localStorage.getItem("user");
    const admin = localStorage.getItem("isAdmin");
    if (storedToken) {
        setToken(storedToken);
        setUser(currentUser);
        setIsAdmin(admin);

    }
  }, [token, user, isAdmin]);

  // We are returning our Title header and NavBar, which will show on every page the user goes to.
  // All of our routes are laid out for our site.
  return (
      <>
        <Title />
        <br></br>
          
        <Router>
          <NavBar token={token} setToken={setToken} isAdmin={isAdmin} setIsAdmin={setIsAdmin} setUser={setUser} />
          {/* <Route path="/" render={(routeProps) => <App />} /> */}
          <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
          <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} 
                                                              setUser={setUser} 
                                                              setIsAdmin={setIsAdmin} 

                                                              />} />
          <Route path="/logout" render={(routeProps) => <Logout {...routeProps} token={token} setToken={setToken} user={user} setUser={setUser} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          {/* <Route path="/users/:userId" render={(routeProps) => <UserPage {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/users/:userId/update" render={(routeProps) => <UpdateUser {...routeProps} token={token} user={user} setUser={setUser} />} /> */}
          {/* <Route path="/users/:userId/orders" render={(routeProps) => <UserOrders {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/users/:userId/cart" render={(routeProps) => <UserCart {...routeProps} token={token} user={user} />} /> */}
          <Route exact path="/products" render={(routeProps) => <AllProducts {...routeProps} token={token} />} />
          <Route exact path="/products/:productId" render={(routeProps) => <SingleProductView {...routeProps} token={token} setToken={setToken} />} />
          {/* <Route path="/orders/:orderId" render={(routeProps) => <SingleOrder {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/reviews/:productId" render={(routeProps) => <Reviews {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/reviews/:reviewId" render={(routeProps) => <SingleReview {...routeProps} token={token} user={user} />} /> */}
          <Route path="/admin" render={(routeProps) => <AdminPage {...routeProps} /> } />
          <Route path="/create" render={(routeProps) => <CreateForm {...routeProps} />} />
          <Route path="/admin/products" render={(routeProps) => <AdminProducts {...routeProps} />} />
          <Route path="/admin/users" render={(routeProps) => <AdminUsers {...routeProps} />} />

        </Router>
      </>
    
  );

}
export default App;

// GET /users/me
// POST /users/register
// POST /users/login
// UPDATE /users/:userId

// GET /products/
// GET /products/:productId
// POST /products/
// UPDATE /products/:productId
// DELETE /products/:productId

// GET /orders/
// GET /orders/:orderId/
// POST /orders/
// UPDATE /orders/:orderid/
// DELETE /orders/:orderId/

// GET /reviews/
// GET /reviews/:reviewId/
// POST /reviews
// UPDATE /reviews/:reviewId
// DELETE /reviews/:reviewId