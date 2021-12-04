import axios from 'axios';
import { getAllProducts } from '../../db/product';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllProducts(){
  try {
      const products = await getAllProducts();
      return products;

  } catch (error) {
      console.error("Error retriving products", error);
  }
}