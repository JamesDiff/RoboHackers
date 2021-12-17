// code to build and initialize DB goes here
const {
  client,
  createProduct, 
  createUser, 
  createOrder, 
  getAllOrders,
  getOrdersByUserEmail, 
  createReviewForProduct
} = require('./index');
const { addProductToOrder } = require('./order_products');

async function dropTables() {
  console.log("Starting to drop tables...");

  try{
    await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS order_products;
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
          phone VARCHAR(255) NOT NULL, 
          is_admin BOOLEAN DEFAULT false
        );
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id), 
          order_status VARCHAR(255) NOT NULL
        );
        CREATE TABLE order_products(
          id SERIAL PRIMARY KEY, 
          "orderId" INTEGER REFERENCES orders(id), 
          "productId" INTEGER REFERENCES products(id), 
          priceAtTimeOfOrder FLOAT NOT NULL, 
          quantity INTEGER NOT NULL,
          UNIQUE("orderId", "productId")
        );
        CREATE TABLE reviews(
          "productId" INTEGER REFERENCES products(id), 
          "userId" INTEGER REFERENCES users(id), 
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL
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

    return products;
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
        phone: "720-937-5883", 
        isAdmin: true
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
        phone: "214-641-7307", 
        isAdmin: true
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
        phone: "702-326-4944", 
        isAdmin: true
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
        phone: "720-512-0024", 
        isAdmin: true
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

async function createInitialUsersOrders(users, products){
  try{
    console.log("starting to create orders...")
    //Create an order for each new user
    const ordersToCreate = [];

    users.forEach((user) => {
      const newOrder = {
        userId: user.id,
        order_status: "Open"
      }
      ordersToCreate.push(newOrder)
    });

    //Create a guest order
    ordersToCreate.push({
      order_status: "Open"
    })

    const orders = await Promise.all(ordersToCreate.map(order => createOrder(order)));
    console.log('Orders Created: ', orders);
    
    const productsAddedToOrders = await Promise.all(orders.map(order => addProductToOrder(order.id, products[0].id, products[0].price, 10)));
    console.log("Products Added to Orders", productsAddedToOrders)

    const ordersWithLineItems = await getAllOrders();
    const orderForUser0 = await getOrdersByUserEmail(ordersWithLineItems[1].creatorEmail);
    console.log("Order for User", ordersWithLineItems[1].creatorEmail, orderForUser0)
    console.log("All Orders with Line Items", ordersWithLineItems);
    
    console.log('Finished creating Orders.');
    return users;
  } catch (error) {
    console.error("Error creating initial Orders!", error)
  }
}

async function createInitialReviews(users, products){
  try{
      //Create review
      const reviewsToCreate = {
          userId: users[0].id, 
          productId: products[0].id, 
          title: "This is a great show", 
          description: "This show is very funny and I would watch it any day of the week!"
        }

      const reviewCreated = await createReviewForProduct(reviewsToCreate);
      console.log("Review Created", reviewCreated);
  }catch (error){
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    const products = await createInitialProducts();
    const users = await createInitialUsers();
    await createInitialUsersOrders(users, products);
    await createInitialReviews(users,products)
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