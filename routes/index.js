// Use the dotenv package, to create environment variable
require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {getUserById} = require("../db/users");

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  if(!auth){
      next();
  } else if(auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
        console.log("CLAIRE WE ARE HERE", token, JWT_SECRET)
          const { id }= jwt.verify(token, JWT_SECRET);
          if (id) {
              req.user = await getUserById(id);
              next();
          }
      } catch (error) {
          console.error("Error getting authoriation", error);
          next(error);
      }
  } else {
      next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${prefix}`
      })
  }
});

//Health Check Route
apiRouter.get("/health", (request, response, next) => {
  response.send({message: "The Server is Up!"});
});

apiRouter.get("/", (req, res) => {
  res.send({
    message: "API is under construction!"
  });
});

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);



module.exports = apiRouter;