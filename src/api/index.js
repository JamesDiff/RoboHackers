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

//******* GETUSER, REGISTER, & LOGIN API CALLS *******/

// test call to grab users info (token and to see if logged in)
export const getUser = async (token) => {

  try {
    const { data } = await axios.get(`/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
    console.log("Current user: ", data);
    return data;
  } catch (error) {
      console.error("ERROR fetching current user!!! 🤦‍♂️ FE-API getUser");
  }
}

// This function registers a new user
export const registerUser = async (setToken, username, password, verifyPassword, email, firstname, lastname, street, city, state, zip, phone) => {

    try {
      if (password !== verifyPassword) {
        alert("Passwords DO NOT match!!! 🤦‍♂️");
        return;
      }
        const { data } = await axios.post('/api/register', {
          username,
          password,
          email,
          firstname,
          lastname,
          street,
          city,
          state,
          zip,
          phone,
        })
        console.log(data);
        const user = data.user;
        const token = data.token;
        console.log("New registered user is: ", user);
        setToken(token);
        localStorage.setItem("token", token);
        if (data.error) throw data.error;
    } 
    
    catch (error) {
        console.error('ERROR registering new user!!! 🤦‍♂️ - FE-API registerUser');
        throw error;
    }
}

// This function logs in a registered user
export const loginUser = async (username, password, setToken) => {

  try {
    const { data } = await axios.post('/api/login', {
      username,
      password,
    })

    console.log(data);
    const token = data.token;
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.getItem("token");
    if (data.error) throw data.error;
  } 
  
  catch (error) {
    console.error("ERROR logging in user!!! 🤦‍♂️ - FE-API loginUser");
    throw error;
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
    const { data } = await axios.delete(`/api/products/${productId}`);
    console.log("Deleted product is: ", data)

    return data;
  } 
  
  catch (error) {
      console.error("ERROR deleting product by id!!! 🤦‍♂️ - FE-API deleteProductById");
      throw error;
  }
}

// This function creates a new product
export const createProduct = async (name, description, price, inventory_qty, img_url) => {

  try {
    const { data } = await axios.post('/api/products', {
      name,
      description,
      price,
      inventory_qty,
      img_url
    })
    console.log("New product is: ", data);

    return data;
  } 
  
  catch (error) {
      console.error("ERROR creating new product!!! 🤦‍♂️ - FE-API createProduct");
      throw error;
  }
}