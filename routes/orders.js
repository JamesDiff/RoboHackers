const { urlencoded } = require('express');
const express = require('express');
const ordersRouter = express.Router();

const { createOrder } = require('../db');


//create order
ordersRouter.post('/', async (req, res, next) => {
    const userId = req.user.id;
    const { total_price, order_status } = req.body;

    const orderToCreate = { userId, total_price, order_status}

    try {
      const newOrder = await createOrder(orderToCreate);
      res.send(newOrder);
 
    } catch (error) {
      next(error);
    }
   
  })

  module.exports = ordersRouter




  //addProductToOrder

  //post to /api/orders/:orderId/products/:productId

 // all you have to send in in body is quantity

 //call get product by Id to get rest of info, and then call stuff waiting in spencers pull request- addProductToOrder-- takes in order id, product id, quantity, price at time of sale

 //prudct id from urlencoded, order from url  load with get product by Id-- get the price of that-- call that function
