'use strict';

const express = require('express');

const router = express.Router();

/*
  * @description: A test route to check authentication
*/
router.get('/profile', (req, res, next) => {
  res.json({
    message : 'Auth Successful',
    user : req.user,
    token : req.query.secret_token
  })
});

module.exports = router;