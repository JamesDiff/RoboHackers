const express = require('express');
const userRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getUser, createUser, getUserById, getUserByEmail } = require('../db');

userRouter.get('/me', async (req, res, next) => {
  
  const {email, password} = req.body; 
  try{
    if(!token){
      console.log("no token")
    }  else {
    const user = await getUser({email, password})
      res.send(user) }
  } catch (error) {
    throw error
  }
  })



module.exports = userRouter;