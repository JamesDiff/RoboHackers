const express = require("express");
require("dotenv").config();

const jwt = require('jsonwebtoken');
const { getPublicRoutinesByUser } = require("../db");
const { JWT_SECRET } = process.env;

const usersRouter = express.Router();

const { createUser, getUserByEmail, getUser } = require("../db/users");


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
    const { email , password } = request.body;
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

module.exports = usersRouter;