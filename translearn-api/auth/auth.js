'use strict';

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//Loads Environment Variables 
require('dotenv').config({path : '../.env'});

/*
  * @description: Passport middleware to handle user registration
*/
passport.use('signup', new localStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true

}, async (req, username, password, done) => {
    try {
      const email = req.body.email;
      const user = await UserModel.create({username, email, password });
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error);
    }
}));

/*
  * @description: Passport middleware to handle user login
*/
passport.use('login', new localStrategy({
  usernameField : 'username',
  passwordField : 'password'
}, async (username, password, done) => {
  try {
    const user = await UserModel.findOne({ username });
    if( !user ){
      return done(null, false, { message : 'Invalid Username or Password'});
    }
    const validate = await user.isValidPassword(password);
    console.log(validate)
    if( !validate ){
      return done(null, false, { message : 'Invalid Username or Password'});
    }
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

/*
  * @description: Passport middleware to verifies that the token sent by the user is valid
*/
passport.use(new JWTstrategy({
  secretOrKey : process.env.SECRET,
  //Expect user to send the token as a query parameter with the name 'secret_token'
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
