'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//Loads Environemnt Variables 
require('dotenv').config({path : '../.env'});

const host = process.env.HOST; 
const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_CONNECTION_URL;


//Create a new model with attributes username, email, password for auth purpose.
const UserSchema = new Schema({
  username : {
    type : String,
    required : true,
    unique : true, 
    minlength : 3,
    maxlength: 30
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    minlength: 5,
    maxlength: 30
  }
});

/*
   * @description: This is a pre-hook, It will be called before user information is saved
   * in database, we'll get the plain text password, hash it and store it.
*/
UserSchema.pre('save', async function(next) {
  const round = 10;
  const hash = await bcrypt.hash(this.password, round);
  this.password = hash;
  next();
});

/*
   * @description: This will check whether user trying to log in has the correct credentials
   * or not.
*/
UserSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;