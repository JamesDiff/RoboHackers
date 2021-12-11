require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const { rebuildDB } = require('../db/init_db');
const { getUserById, createUser, getUser, createOrder, createProduct, getAllProducts, getProductById} = require('../db');
const client = require('../db/client');
const { addProductToOrder } = require('../db/order_products');

describe('Database', () => {
    let queriedOrder, queriedProduct;
  beforeAll(async() => {
    await rebuildDB();
  })
  afterAll(async() => {
    await client.end();
  })
  describe('Users', () => {
    let userToCreateAndUpdate, queriedUser;
    let userCredentials = {firstname: 'Billy', lastname:"Bob", password: 'bobbybadboy', email:"billybob@gmail.com", street:"123 Main St", city: "Broomfield", state:"CO", zip:"80020", phone:"555-555-5555"};
    describe('createUser({ firstname, lastname, password, email, street, city, state, zip, phone})', () => {
      beforeAll(async () => {
        userToCreateAndUpdate = await createUser(userCredentials);
        const {rows} = await client.query(`SELECT * FROM users WHERE email = $1`, [userCredentials.email]);
        queriedUser = rows[0];
      })
      it('Creates the user', async () => {
        expect(userToCreateAndUpdate.email).toBe(userCredentials.email);
        expect(queriedUser.email).toBe(userCredentials.email);
      });
      it('EXTRA CREDIT: Does not store plaintext password in the database', async () => {
        expect(queriedUser.password).not.toBe(userCredentials.password);
      });
      it('EXTRA CREDIT: Hashes the password (salted 10 times) before storing it to the database', async () => {
        const hashedVersion = bcrypt.compareSync(userCredentials.password, queriedUser.password);
        expect(hashedVersion).toBe(true);
      });
      it('Does NOT return the password', async () => {
        expect(userToCreateAndUpdate.password).toBeFalsy();
      })
    })
    describe('getUser({ username, password })', () => {
      let verifiedUser;
      beforeAll(async () => {
        verifiedUser = await getUser(userCredentials);
      })
      it('Verifies the passed-in, plain-text password against the password in the database (the hashed password, if this portion is complete)', async () => {
        const unVerifiedUser = await getUser({email: userCredentials.email, password: 'badPassword'});
        expect(verifiedUser).toBeTruthy();
        expect(verifiedUser.email).toBe(userCredentials.email);
        expect(unVerifiedUser).toBeFalsy();
      })
      it('Does NOT return the password', async () => {
        expect(verifiedUser.password).toBeFalsy();
      })
    })
    describe('getUserById', () => {
      it('Gets a user based on the user Id', async () => {
        const user = await getUserById(userToCreateAndUpdate.id);
        expect(user).toBeTruthy();
        expect(user.id).toBe(userToCreateAndUpdate.id);
      })
    })
  })
  describe('Orders', () => {
    let orderToCreateAndUpdate;
    let orderCredentials = {
        userId: 1,
        total_price: 0, 
        order_status: "Open"
    };
    describe('createOrder({ "userId", total_price, order_status})', () => {
      beforeAll(async () => {
        orderToCreateAndUpdate = await createOrder(orderCredentials);
        const {rows} = await client.query(`SELECT * FROM orders WHERE "userId" = $1`, [orderCredentials.userId]);
        queriedOrder = rows[0];
      })
      it('Creates the order', async () => {
        expect(orderToCreateAndUpdate.userId).toBe(orderCredentials.userId);
        expect(queriedOrder.userId).toBe(orderCredentials.userId);
      });
    })
  })
  describe('Products', () => {
    let productToCreateAndUpdate, allProducts, queriedAllProducts, productById, queriedProductById;
    let productCredentials = {
        name: "Community", 
        description: "A rag tag bunch of communtiy college students try to figure out life, relationships and the crazy DEAN DEEE DEAN DEAN DEEEEAAAANNN", 
        price: 19.99, 
        inventory_qty: 50, 
        img_url:'https://m.media-amazon.com/images/I/81Sh1743JeL._SY606_.jpg'
      }
    describe('getAllProducts()', () => {
        beforeAll(async () => {
            allProducts = await getAllProducts();
            const {rows} = await client.query('SELECT * FROM products');
            queriedAllProducts = rows;
        })
        it('Gets All Products', async () => {
            expect(allProducts.length).toBe(queriedAllProducts.length);
        })
    })
    describe('createProduct({ name, description, price, inventory_qty, img_url})', () => {
      beforeAll(async () => {
        productToCreateAndUpdate = await createProduct(productCredentials);
        const {rows} = await client.query(`SELECT * FROM products WHERE name = $1`, [productCredentials.name]);
        queriedProduct = rows[0];
      })
      it('Creates the Product', async () => {
        expect(productToCreateAndUpdate.name).toBe(productCredentials.name);
        expect(queriedProduct.name).toBe(productCredentials.name);
      });
    })
    describe('getProductById(id)', () => {
        beforeAll(async () => {
            productById = await getProductById(productToCreateAndUpdate.id);
            const {rows} = await client.query(`SELECT * FROM products WHERE id = $1`, [productToCreateAndUpdate.id]);
            queriedProductById = rows[0];
        })
        it('Gets the Product by Id', async () => {
          expect(productById.id).toBe(queriedProductById.id);
          expect(productById.name).toBe(queriedProductById.name);
        });
      })
  })
  describe('Add Products to Orders', () => {
    let lineItemToBeCreated, queriedLineItem;
    let lineItemCredentials = {
        orderId: 1, 
        productId:2,
        price: 10, 
        quantity: 10
    };
    describe('addProductToOrder(orderId, productId, price, quanityt)', () => {
      beforeAll(async () => {
        lineItemToBeCreated = await addProductToOrder(lineItemCredentials.orderId, lineItemCredentials.productId, lineItemCredentials.price, lineItemCredentials.quantity);
        console.log("line item created" , lineItemToBeCreated);
        const {rows} = await client.query(`SELECT * FROM order_products WHERE id = $1`, [lineItemToBeCreated.id]);
        queriedLineItem = rows[0];
      })
      it('Creates the order', async () => {
        expect(lineItemToBeCreated.orderId).toBe(lineItemCredentials.orderId);
        expect(queriedLineItem.orderId).toBe(lineItemCredentials.orderId);
      });
    })
  })
});
