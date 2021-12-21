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
        name: "It's Always Sunny in Philadelphia", 
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
      {
        name: "Breaking Bad", 
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.", 
        price: 46.99, 
        inventory_qty: 23, 
        img_url:'https://flxt.tmsimg.com/assets/p185846_b_v9_ad.jpg'
      }, 
      {
        name: "Pulp Fiction", 
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", 
        price: 13.49, 
        inventory_qty: 33, 
        img_url:'https://www.miramax.com/media/assets/Pulp-Fiction1.png'
      }, 
      {
        name: "World War Z", 
        description: "Former United Nations employee Gerry Lane traverses the world in a race against time to stop a zombie pandemic that is toppling armies and governments and threatens to destroy humanity itself.", 
        price: 10.99, 
        inventory_qty: 8, 
        img_url:'https://flxt.tmsimg.com/assets/p9087912_p_v10_av.jpg'
      },
      {
        name: "Game of Thrones", 
        description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.", 
        price: 78.99, 
        inventory_qty: 45, 
        img_url:'https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_FMjpg_UX1000_.jpg'
      }, 
      {
        name: "Kingdom", 
        description: "While strange rumors about their ill King grip a kingdom, the crown prince becomes their only hope against a mysterious plague overtaking the land.", 
        price: 15.49, 
        inventory_qty: 28, 
        img_url:'https://i.pinimg.com/564x/aa/e6/03/aae6034c7dd0aebb9666f5094b742710.jpg'
      }, 
      {
        name: "Dexter", 
        description: "He's smart. He's lovable. He's Dexter Morgan, America's favorite serial killer, who spends his days solving crimes and nights committing them. Golden Globe winner Michael C. Hall stars in the hit SHOWTIME Original Series.", 
        price: 33.99, 
        inventory_qty: 57, 
        img_url:'https://m.media-amazon.com/images/M/MV5BZjkzMmU5MjMtODllZS00OTA5LTk2ZTEtNjdhYjZhMDA5ZTRhXkEyXkFqcGdeQXVyOTA3MTMyOTk@._V1_.jpg'
      },
      {
        name: "Star Wars: The Original Trilogy", 
        description: "The Star Wars Trilogy, also known as the original trilogy or the classic trilogy, is the first set of three films produced in the Star Wars franchise, an American space opera created by George Lucas.", 
        price: 46.49, 
        inventory_qty: 25, 
        img_url:'https://www.moviemem.com/wp-content/uploads/2020/07/STARWARSTRILOGY1SHHRwslogo.jpg'
      }, 
      {
        name: "Lord of the Rings: The Complete Trilogy", 
        description: "The Lord of the Rings is a series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien.", 
        price: 67.99, 
        inventory_qty: 19, 
        img_url:'https://cdn.hmv.com/r/w-640/hmv/files/2f/2fe217e0-9fdd-4711-a336-94d372ea6b58.jpg'
      }, 
      {
        name: "Predator", 
        description: "A team of commandos on a mission in a Central American jungle find themselves hunted by an extraterrestrial warrior.", 
        price: 5.99, 
        inventory_qty: 48, 
        img_url:'https://lumiere-a.akamaihd.net/v1/images/predator_feature-poster_584x800_6ec38255.jpeg?region=0%2C0%2C584%2C800'
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