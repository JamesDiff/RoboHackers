import axios from 'axios';

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export const registerUser = async (setToken, username, password, verifyPassword, email, firstname, lastname, city, state, zipcode, phone) => {

  try {
    if (password !== verifyPassword) {
      alert("Passwords DO NOT match!!! 🤦‍♂️");
      return;
    }

    const response = await fetch('/api/users/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
        city: city,
        state: state,
        zipcode: zipcode,
        phone: phone
      })
    })
    const result = await response.json();
    console.log(result);
    const user = result.user;
    const token = result.token;
    console.log("New registered user is: ", user);
    setToken(token);
    localStorage.setItem("token", token);
    if (result.error) throw result.error;
    
  } 
  
  catch (error) {
    console.error("ERROR registering new user!!! 🤦‍♂️");
    throw error;
  }
}

export const loginUser = async (username, password, setToken) => {

  try {
    const response = await fetch('/api/users/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    const result = await response.json();
    console.log(result);
    console.log(result.token);
    const token = result.token;
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.getItem("token");
    if (result.error) throw result.error;
    
  } 
  
  catch (error) {
    console.error("ERROR logging in user!!! 🤦‍♂️");
    throw error;
  }
}

export const getAllProducts = () => {
  try {
    const response = await fetch('/api/products', {
      headers: {
        'Content-Type': 'application.json'
      },
    })

    const result = await response.json();

    if (result.error) throw result.error;
    console.log(result);
    return result;
    
  } 
  
  catch (error) {
    console.error('ERROR fetching all products!!! 🤦‍♂️');
    throw error;
  }
}

// test call to grab users info (token and to see if logged in)
export const getUser = async (token) => {
  try {
      const response = await fetch('/api/users/me', {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      const result = await response.json();
      console.log(chalk.cyan("Logged in user data: "), result);
      return result;
     
  }
  catch (err) {
      console.error(chalk.red("Trouble fetching user data!!!"), err);
  }
}