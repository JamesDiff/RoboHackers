const express = require('express');
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send({
    message: "API is under construction!"
  });
});

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);





module.exports = apiRouter;