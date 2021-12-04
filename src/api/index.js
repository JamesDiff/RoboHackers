import axios from 'axios';

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export const getAllProducts = () => {
  try {
    const { data } = await axios.get('/api/products');
    return data;
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