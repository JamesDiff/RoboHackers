const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

module.exports = apiRouter;

const productsRouter = require('./products');
apiRouter.use('./products', productsRouter);
