import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { 
  Register,
  Login, 
  AllProducts, 
  Title,
  SingleProductView,
  NavBar,
  AdminPage,
  AdminProducts,
  AdminUsers,
  AdminUpdate,
  AdminOrders,
  Cart,
  CreateForm,
  MyAccount,
  EditUser
 } from '../components';

 import Home from './home';

const App = () => {
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("token"));


  // As soon as page hits we will grab the current logged in users token and set it on state.
  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    console.log("STORED TOKEN FROM APP", storedToken)
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
          <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken}
                                                              setUser={setUser}
                                                              setIsAdmin={setIsAdmin} />} />
          <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} 
                                                              setUser={setUser} 
                                                              setIsAdmin={setIsAdmin} />} />
          {/* <Route path="/users/:userId" render={(routeProps) => <UserPage {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/users/:userId/update" render={(routeProps) => <UpdateUser {...routeProps} token={token} user={user} setUser={setUser} />} /> */}
          {/* <Route path="/users/:userId/orders" render={(routeProps) => <UserOrders {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/users/:userId/cart" render={(routeProps) => <UserCart {...routeProps} token={token} user={user} />} /> */}
          <Route exact path="/products" render={(routeProps) => <AllProducts {...routeProps} token={token} />} />
          <Route exact path="/products/:productId" render={(routeProps) => <SingleProductView {...routeProps} token={token} setToken={setToken} />} />
          <Route exact path="/cart" render={(routeProps) => <Cart {...routeProps} token={token} setToken={setToken} />} />
          {/* <Route path="/orders/:orderId" render={(routeProps) => <SingleOrder {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/reviews/:productId" render={(routeProps) => <Reviews {...routeProps} token={token} user={user} />} /> */}
          {/* <Route path="/reviews/:reviewId" render={(routeProps) => <SingleReview {...routeProps} token={token} user={user} />} /> */}
          <Route path="/admin" render={(routeProps) => <AdminPage {...routeProps} /> } />
          <Route path="/admin-create" render={(routeProps) => <CreateForm {...routeProps} />} />
          <Route path="/update/:productId" render={(routeProps) => <AdminUpdate {...routeProps} />} />
          <Route path="/admin-products" render={(routeProps) => <AdminProducts {...routeProps} />} />
          <Route path="/admin-users" render={(routeProps) => <AdminUsers {...routeProps} />} />
          <Route path="/admin-orders" render={(routeProps) => <AdminOrders {...routeProps} />} />
          <Route path ="/account" render={(routeProps) => <MyAccount {...routeProps} token={token} />} />
          <Route path="/" exact render={(routeProps) => <Home {...routeProps} />} />

          <Route path="/editUser" render={(routeProps) => <EditUser {...routeProps} token={token} user={user} />} />


        </Router>
      </>
    
  );

}
export default App;