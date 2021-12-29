const express = require("express");
require("dotenv").config();

const jwt = require('jsonwebtoken');
const { deleteReviewByUser, assignUserToOrder } = require("../db");
const { JWT_SECRET } = process.env;

const usersRouter = express.Router();

const { createUser, getUserByEmail, getUser, getAllUsers, deleteUserById, saveActiveOrderId } = require("../db/users");


usersRouter.post('/register', async (request, response, next) => {
    const { firstname, lastname, password, email, street, city, state, zip, phone } = request.body;
    try {
        const _user = await getUserByEmail(email);
        if(_user){
            throw Error({
                name: 'UserExistsError', 
                message: 'A user by that username already exists'
            });
        }

        if(password.length < 8) {
            throw Error({
                name: 'PasswordTooShortError', 
                message: "Password must be at least 8 characters"
            });
        }

        const newUser = {
            firstname:firstname, lastname:lastname, password:password, email:email, street:street, city:city, state:state, zip:zip, phone:phone
        }
        console.log("Creating User", newUser)
        const user = await createUser(newUser)
        console.log("Created User", user);

        if (!user) {
            throw Error(`Error creating user.`);
          } else {
            const token = jwt.sign(
                {
                  id: user.id,
                  user,
                },
                JWT_SECRET,
                {
                  expiresIn: "1w",
                }
              );
            response.send({
                message: "You have successfully registered!!",
                user: user,
                token: token,
            })
          }

        
    } catch (error) {
        next(error);
    }
});

usersRouter.post('/login', async (request, response, next) => {
    const { email , password, orderId } = request.body;
    try {
        if(!email || !password) {
            throw Error({
                name: 'MissingCredentialsError', 
                message: "Please supply both a username and a password"
            })
        }
        const user = await getUser({email: email, password: password});
        if(user){
            const token = jwt.sign(user, JWT_SECRET);
            response.send({
                message: "User logged in successfully!",
                user: user,
                token: token});

            if(orderId){
                console.log("Assigning Order to User", orderId, user.id)
                const order = await assignUserToOrder(orderId, user.id);
                console.log("Order", order);
            }    
        } else {
            throw Error({
                name: 'IncorrectCredentialsError', 
                message: 'Username of Password is incorrect'
            });
        }
    } catch (error) {
        next(error);
    }
});


usersRouter.get('/me', (request,response,next) => {
    if(request.user) {
        response.send(request.user);
    }else{
        next({
            name: 'InvalidUserToken', 
            message: 'Token Provided was not correct, no user found.'
        });
    }
});

// route to get all users for admin users page
usersRouter.get('/', async (req, res) => {
    
    const user = req.user;
  
    if (user) {
      try {
        const users = await getAllUsers();
  
        return res.send({ users });
      } catch (error) {
        console.log(error);
      }
    }
});

  usersRouter.delete('/:userId', async (req, res, next) => { 
    const user = req.user;
    const userId = req.params.userId;

    try{
        const deletedReview = await deleteReviewByUser(userId);
        console.log("Deleted review is: ", deletedReview);
        const deletedUser = await deleteUserById(userId);
        res.send(deletedUser);
    
    } catch(error) {
      next(error);
    }
})

usersRouter.post(`/saveorder/:orderId`, async (req, res, next) => {
    const userId = req.user.id;
    const orderId = req.params.orderId;
    console.log("Saving order for logged off user", userId, orderId);

    try{
        const user = await saveActiveOrderId(userId, orderId)
    }catch(error){
        next(error);
    }
})

module.exports = usersRouter;