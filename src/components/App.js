import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Register, Login, Logout, AllProducts } from '../components';
import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
      <>
        <NavBar />
        
        <Router>
          <Route path="/home" render={(routeProps) => <Home />} />
          <Route path="/users/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
          <Route path="/users/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} />
          <Route path="/users/logout" render={(routeProps) => <Logout {...routeProps} token={token} setToken={setToken} />} />
          <Route path="/products" render={(routeProps) => <AllProducts {...routeProps} token={token} setUser={setUser} />} />
          <Route path="/products/:productId" render={(routeProps) => <SingleProductView {...routeProps} />} />
          <Route path="/orders" render={(routeProps) => <Orders {...routeProps} token={token} user={user} />} />
          <Route path="/orders/:orderId" render={(routeProps) => <SingleOrder {...routeProps} token={token} user={user} />} />
          <Route path="/reviews" render={(routeProps) => <Reviews {...routeProps} token={token} user={user} />} />
          <Route path="/reviews/:reviewId" render={(routeProps) => <SingleReview {...routeProps} token={token} user={user} />} />
        </Router>
        
      </>
    // <div className="App">
    //   <h1>Hello, World!</h1>
    //   <h2>{ message }</h2>
    // </div>
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