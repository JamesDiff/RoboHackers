// code to build and initialize DB goes here
const {
  client,
  createProduct
} = require('./index');

async function dropTables() {
  console.log("Starting to drop tables...");

  try{
    await client.query(`
      DROP TABLE IF EXISTS products;
    `);
    console.log("Finished dropping tables")
  } catch(error) {
    console.log("Error dropping tables!")
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  // create all tables, in the correct order
  try{
    await client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY, 
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL,
          inventory_qty INTEGER NOT NULL, 
          img_url VARCHAR(255)
        );
    `);

    console.log("Finished Creating tables");
  }catch (error) {
    console.error("Error Creating tables");
    throw error;
  }
}

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await dropTables();

    // build tables in correct order
    await createTables();

  } catch (error) {
    throw error;
  }
}
async function createInitialProducts() {
  try{
    console.log("starting to create products...")
    const productsToCreate = [
      {
        name: "It's Always Sunny in Philidelphia", 
        description: "A crazy group of people who own the bar Pattys Pub do horrible things!", 
        price: 15, 
        inventory_qty: 30, 
        img_url:'https://m.media-amazon.com/images/I/91zdZAy8FOL._SL1500_.jpg'
      }, 
      {
        name: "Brooklyn 99", 
        description: "Follow the crazy goings on in the NYPDs 99th", 
        price: 25, 
        inventory_qty: 50, 
        img_url:'https://static.wikia.nocookie.net/brooklynnine-nine/images/4/42/Season5_poster.jpg'
      }, 
      {
        name: "Die Hard", 
        description: "John McClane has to save the day when a group of terrorists seize the Nakatomi Building", 
        price: 9.99, 
        inventory_qty: 14, 
        img_url:'https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg'
      }, 
    ]

    const products = await Promise.all(productsToCreate.map(product => createProduct(product)));
    console.log('Products Created: ', products)
    console.log('Finished creating products.')
  } catch (error) {
    console.error("Error creating initial products!")
    throw error;
  }
}
async function populateInitialData() {
  try {
    // create useful starting data
    await createInitialProducts();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());