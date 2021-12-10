// code to build and initialize DB goes here
const {
  client,
  createProduct, 
  createUser, 
  createOrder
} = require('./index');

async function dropTables() {
  console.log("Starting to drop tables...");

  try{
    await client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
    console.log("Finished dropping tables")
  } catch(error) {
    console.log("Error dropping tables!", error)
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
        CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          firstname VARCHAR(255) NOT NULL,
          lastname VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          street VARCHAR(255) NOT NULL,
          city VARCHAR(255) NOT NULL,
          state VARCHAR(255) NOT NULL, 
          zip VARCHAR(255) NOT NULL,
          phone VARCHAR(255) NOT NULL
        );
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id), 
          total_price FLOAT NOT NULL,
          order_status VARCHAR(255) NOT NULL
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
    console.log("Client", client)
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

async function createInitialUsers(){
  try{
    console.log("starting to create users...")
    const usersToCreate = [
      {
        firstname: "Spencer", 
        lastname: "Porter",
        password: "spencer123",
        email: "scfp419@gmail.com",
        street: "12888 Creekwood St.",
        city: "Firestone", 
        state: "CO",
        zip: "80504",
        phone: "720-937-5883"
      }, 
      {
        firstname: "Claire", 
        lastname: "Pender",
        password: "claire123",
        email: "clairepender5@gmail.com",
        street: "906 E Leslie Circle Unit B ",
        city: "Austin", 
        state: "TX",
        zip: "78721",
        phone: "214-641-7307"
      }, 
      {
        firstname: "Derek", 
        lastname: "Miller",
        password: "derek123",
        email: "da970miller@gmail.com",
        street: "1612 Waterford LN",
        city: "Fort Collins", 
        state: "CO",
        zip: "80525",
        phone: "702-326-4944"
      }, 
      {
        firstname: "James", 
        lastname: "Diffee",
        password: "james123",
        email: "james.j.diffee@gmail.com",
        street: "1234 Fake Street Boulder, CO 80305",
        city: "Boulder", 
        state: "CO",
        zip: "80305",
        phone: "720-512-0024"
      }
    ]
    const users = await Promise.all(usersToCreate.map(user => createUser(user)));
    console.log('Users Created: ', users);
    console.log('Finished creating users.');
    return users;
  } catch (error) {
    console.error("Error creating initial users!")
  }
}

async function createInitialUsersOrders(users){
  try{
    console.log("starting to create orders...")
    //Create an order for each new user
    const ordersToCreate = [];

    users.forEach((user) => {
      const newOrder = {
        userId: user.id,
        total_price: 0, 
        order_status: "Open"
      }
      ordersToCreate.push(newOrder)
    });

    //Create a guest order
    ordersToCreate.push({
      total_price: 0, 
      order_status: "Open"
    })

    const orders = await Promise.all(ordersToCreate.map(order => createOrder(order)));
    console.log('Orders Created: ', orders);
    console.log('Finished creating Orders.');
    return users;
  } catch (error) {
    console.error("Error creating initial Orders!")
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    await createInitialProducts();
    const users = await createInitialUsers();
    await createInitialUsersOrders(users);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB(){
  try{
    await buildTables();
    await populateInitialData();
  }catch(error){
    throw error;
  }
}

module.exports = {rebuildDB};