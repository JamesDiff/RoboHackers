import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export const getAllProducts = () => {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } 
  
  catch (error) {
    console.error(chalk.red('ERROR fetching all products!!! 🤦‍♂️'));
    throw error;
  }
}