'use strict';

//Libs
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors')

//Loads Environment Variables 
require('dotenv').config();

const host = process.env.HOST; 
const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_CONNECTION_URL;

// Connection with DataBase
mongoose
  .connect(dbUrl, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    dbName : dbName
  })
  .then(() => { console.log("Connected to MongoDB") })
  .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));

//Express App
const app = express()

//Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Auth
require('./auth/auth');

//Routes
const routes = require('./routes/routes');
const secureRoute = require('./routes/secure_routes');

app.use('/', routes);
//plugin jwt strategy as a middleware so only verified users can access these routes
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});


app.listen(port, host, () => {
  console.log(`Running at http://${host}:${port}`);
});
