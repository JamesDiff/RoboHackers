import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { 
  Register,
  // Login, 
  // Logout, 
  AllProducts, 
  Title,
  SingleProductView 
  // NavBar,
 } from '../components';





const App = () => {
  // Need to figure out the whole message thing, but i don't even think we need to use it at all.
  // const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  // const [user, setUser] = useState(null);


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
    if (storedToken) {
        setToken(storedToken);
        console.log("Token is set: ", token);
    }
}, [token]);



  // We are returning our Title header and NavBar, which will show on every page the user goes to.
  // All of our routes are laid out for our site.
  return (
      <>
        <Title />
        <br></br>
        {/* <NavBar /> */}
        
        <Router>
          {/* <Route path="/home" render={(routeProps) => <Home />} /> */}
          <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
          {/* <Route path="/users/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} /> */}
          {/* <Route path="/users/logout" render={(routeProps) => <Logout {...routeProps} token={token} setToken={setToken} />} /> */}
          {/* <Route path="/users/:userId" render={(routeProps) => <UserPage {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/users/:userId/update" render={(routeProps) => <UpdateUser {...routeProps} token={token} user={user} setUser={setUser} />} /> */}
          {/* <Route path="/users/:userId/orders" render={(routeProps) => <UserOrders {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/users/:userId/cart" render={(routeProps) => <UserCart {...routeProps} token={token} user={user} />} /> */}
          <Route path="/products" render={(routeProps) => <AllProducts {...routeProps} token={token} />} />
          <Route path="/products/:productId" render={(routeProps) => <SingleProductView {...routeProps} />} />
          {/* <Route path="/orders/:orderId" render={(routeProps) => <SingleOrder {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/products/reviews" render={(routeProps) => <Reviews {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/products/reviews/:reviewId" render={(routeProps) => <SingleReview {...routeProps} token={token} user={user} />} /> */}

          <Link to="/products" className="link">
          ALL PRODUCTS
          </Link>
          <br />
          <Link to="/register" className="link">
          REGISTER
          </Link>
        </Router>

        

        <div className="App">
          <h1>Welcome to GraceShopper!</h1>
          <br></br>
          <br></br>
          {/* <h2>{ message }</h2> */}
        </div>

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