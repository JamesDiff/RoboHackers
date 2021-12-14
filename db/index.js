const client = require("./client")

// database methods


// export
module.exports = {
  client,
  ...require('./product'), // Products
  ...require('./users'), // Users
  ...require('./orders'), // Orders
  ...require('./order_products')
}