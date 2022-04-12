// import {BASE_URL} from '../constants';


import axios from 'axios';
//import { getAllProducts } from '../../db/product';

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

//******* USER API CALLS *******/

// test call to grab users info (token and to see if logged in)
export const getUser = async (token) => {
if (!token) {
  return null;
}

  try {
    const { data } = await axios.get(`/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
    console.log("Current user from API index file: ", data);
    return data;
  } catch (error) {
      console.error("ERROR fetching current user!!! 🤦‍♂️ FE-API getUser");
  }
}

// This function will get all users from db
export async function getAllUsers() {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }

  try {
    const { data } = await axios.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("ALL USERS: ", data)

    return data;
  } catch (error) {
    console.error("ERROR getting all users!!! FE-API getAllUsers");
    throw error;
  }
}

export const deleteUser = async (userId) => {

  try {
    const result = await axios.delete(`/api/users/${userId}`);
    console.log("Deleted user is: ", result)

    return result;
  } 
  
  catch (error) {
      console.error("ERROR deleting user by id!!! - FE-API deleteUser");
      throw error;
  }
}



export const updateUser = async (userId, newfirstname, newlastname, newemail, newstreet, newcity, newstate, newzip, newphone) => {
  try {
    const { data } = await axios.patch(`/api/users/${userId}`, {
      firstname: newfirstname,
      lastname: newlastname,
      email: newemail,
      street: newstreet,
      city: newcity,
      state: newstate,
      zip: newzip,
      phone: newphone
  })
  return data;
    
}
catch (error) {
    console.error("Trouble updating user- FE-API updateUser", error)
}
}

export const updateBilling = async (userId, billingInfo) => {
  try {
    const { data } = await axios.patch(`/api/users/${userId}/billing`, billingInfo)
  return data;
    
}
catch (error) {
    console.error("Trouble updating user- FE-API updateUser", error)
}
}


// This function registers a new user
export const registerUser = async (setToken, setUser, setIsAdmin, firstname, lastname, password, verifyPassword, email, street, city, state, zip, phone) => {

    try {
      if (password !== verifyPassword) {
        alert("Passwords DO NOT match!!! 🤦‍♂️");
        return;
      }
        const result = await axios.post('/api/users/register', {
          firstname,
          lastname,
          password,
          email,
          street,
          city,
          state,
          zip,
          phone,
        })
        console.log(result);
        const currentUser = result.data.user;
        const token = result.data.token;
        const adminStatus = result.data.user.is_admin;
        console.log("New registered user is: ", currentUser);
        console.log("Token is: ", token);
        console.log("Admin status: ", adminStatus);
        setToken(token);
        setUser(currentUser);
        setIsAdmin(adminStatus);
        localStorage.setItem("token", token);
        localStorage.getItem("token");
        localStorage.setItem("user", currentUser);
        localStorage.getItem("user");
        localStorage.setItem("isAdmin", adminStatus);
        localStorage.getItem("isAdmin");
        
        if (result.error) throw result.error;
    } 
    
    catch (error) {
        console.error('ERROR registering new user!!! 🤦‍♂️ - FE-API registerUser');
        throw error;
    }
}

// This function logs in a registered user
export const loginUser = async (email, 
  password, 
  setToken, 
  setUser, 
  setIsAdmin, orderId
  ) => {

  try {
    const result = await axios.post('/api/users/login', {
      email,
      password,
      orderId
    })

    console.log(result);
    const token = result.data.token;
    const currentUser = result.data.user;
    const adminStatus = result.data.user.is_admin;
    const activeOrderId = currentUser.activeorderid;
    console.log("Current User is: ", currentUser);
    console.log("Admin status is: ", adminStatus);
    console.log("Active Order Id", activeOrderId)
    setToken(token);
    setUser(currentUser);
    setIsAdmin(adminStatus);
    localStorage.setItem("token", token);
    localStorage.getItem("token");
    localStorage.setItem("user", currentUser);
    localStorage.getItem("user");
    localStorage.setItem("isAdmin", adminStatus);
    localStorage.getItem("isAdmin");
    if(activeOrderId){
      localStorage.setItem("ActiveOrderId", activeOrderId);
      localStorage.getItem("ActiveOrderId");
    }
    if (result.error) throw result.error;
  } 
  
  catch (error) {
    console.error("ERROR logging in user!!! 🤦‍♂️ - FE-API loginUser");
    return "Invalid credentials. Try again";
  }
}

//************ PRODUCT API CALLS ***************/


// This function will fetch all the products in the database.
export const getAllProducts = async () => {
  try {
    const data = await axios.get('/api/products');
    console.log('All products: ', data);

    return data;
  } 
  
  catch (error) {
    console.error('ERROR fetching all products!!! 🤦‍♂️ - FE-API allProducts');
    throw error;
  }
}

// This function fetches a single product from the database by it's productId.
  export const getProductById = async (productId) => {

    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      console.log('The product by id is: ', data);
      return data;
    } 
  
    catch (error) {
      console.error("ERROR getting product by productId!!! 🤦‍♂️ - FE-API getProductById");
      throw error;
    }
  }

// This function deletes a single product by it's id
export const deleteProductById = async (productId) => {

  try {
    const result = await axios.delete(`/api/products/${productId}`);
    console.log("Deleted product is: ", result)

    return result;
  } 
  
  catch (error) {
      console.error("ERROR deleting product by id!!! 🤦‍♂️ - FE-API deleteProductById");
      throw error;
  }
}

// This function creates a new product
export const createProduct = async (name, description, price, inventory_qty, img_url) => {

  try {
    const result = await axios.post('/api/products', {
      name,
      description,
      price,
      inventory_qty,
      img_url
    })
    console.log("New product is: ", result);

    return result;
  } 
  
  catch (error) {
      console.error("ERROR creating new product!!! 🤦‍♂️ - FE-API createProduct");
      throw error;
  }
}

export const updateProduct = async (productId, name, description, price, inventory_qty, img_url) => {
  try {
      const { data } = await axios.patch(`/api/products/${productId}`, {
          name: name,
          description: description,
          price: price,
          inventory_qty: inventory_qty,
          img_url: img_url,
      })
      console.log("Updated product is: ", data)
      return data;
  }
  catch (err) {
      console.error("Trouble updating product - FE-API updateProduct", err)
  }
}

// Submit a review
export const submitReviewForProduct = async (token, productId, title, description, stars) => {
  try {
      const { data } = await axios.post(`/api/products/${productId}/reviews`, 
        {
          productId: productId, 
          title: title, 
          description: description, 
          stars: stars
        },
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      })
      return data;
  }catch (error){
    console.error("Error creating a review for a product", error);
    throw error;
  }
}

export const deleteReview = async (token, reviewId) => {

  try {
    return axios.delete(`http://localhost:5000/api/products/reviews/${reviewId}`,
      {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
      }
    );
   
  } 
  
  catch (error) {
      console.error("ERROR deleting product by id!!! 🤦‍♂️ - FE-API deleteProductById");
      throw error;
  }
}

//********* ORDERS **********/

export const createOrder = async (token) => {
  let headers = {};
  if(token){
    headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }
  }
  try{
    const {data} = await axios.post(`/api/orders`, {}, headers)
  console.log("Order Created", data)
  return data.id;
  }catch (error){
    console.error("Error creating order", error);
    throw error;
  }
}

export const addProductToOrder = async (token, orderId, productId, quantity) => {
  let headers = {};
  if(token){
    headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }
  }
  try{
    const {data} = await axios.post(`/api/orders/${orderId}/products/${productId}`, 
    {
      quantity: quantity
    }, headers);
    console.log("Product added to order: ", data);
  }catch (error) {
    console.error("Error adding product to order", error);
    throw error;
  }
}

export const getOrderById  = async (orderId, setOrder) => {
  try{
    const {data} = await axios.get(`/api/orders/${orderId}`, {} , {});
    console.log("Got Order", data);
    return data;
  } catch (error) {
    console.error("Error getting order by Id")
    throw error;
  } 
}

export const getAllOrders = async () => {

  try {
    const data = await axios.get('/api/orders');
    console.log('All orders: ', data);

    return data;
  } 
  
  catch (error) {
    console.error('ERROR fetching all orderss!!! 🤦‍♂️ - FE-API getAllOrders');
    throw error;
  }
}

// This function deletes a single order by it's id
export const deleteOrderById = async (orderId) => {

  try {
    const result = await axios.delete(`/api/orders/${orderId}`);
    console.log("Deleted order is: ", result)

    return result;
  } 
  
  catch (error) {
      console.error("ERROR deleting order by id!!! - FE-API deleteOrderById");
      throw error;
  }
}

export const removeLineItemByID = async (lineItemId) => {
  try{
    const {data} = await axios.delete(`/api/orders/lineitem/${lineItemId}`, {}, {})
  } catch (error) {
    console.error("Error deleting line item", error);
    throw error;
  }
}
export const saveOrderToUser = async (token, orderId) => {
  try {
    const {data} = await axios.post(`/api/users/saveorder/${orderId}`, {},
    {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      }
    })
  } catch (error) {
    console.error("Error saving the logged off user order")
    throw error;
  }
}

export const closeOrderById = async (orderId) => {
  try {
    const {data} = await axios.post(`/api/orders/complete/${orderId}`, {}, {})
  } catch (error) {
    console.error("Error completing order");
    throw error;
  }
}