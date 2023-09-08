const express = require('express');
const restRouter = express.Router();
const passport = require('passport');
const {User}  = require('../model');
const { genSaltHash } = require('../utils/cryptoUtils');

// import passport configuration
require('../config/passport');

// REST API will handle the authentication since it's much simpler and secure than handling with graphql
restRouter.post('/login',passport.authenticate('local', {failureRedirect: '/login', successRedirect:'/'}));

restRouter.post('/register', async (req,res)=>{
    const password = req.body.password;
    const username = req.body.username;

    const saltHash = genSaltHash(password);
    const newArgs = {
        username,
        ...saltHash
    };

    const user = await User.create(newArgs);

    res.redirect('/');
});

restRouter.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

module.exports = restRouter;