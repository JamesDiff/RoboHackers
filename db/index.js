const client = require("./client")

// database methods


// export
module.exports = {
  client,
  ...require('./product'), // Products
  ...require('./users') // users
}