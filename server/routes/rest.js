const express = require('express');
const restRouter = express.Router();
const passport = require('passport');
const {User}  = require('../model');
const { genSaltHash } = require('../utils/cryptoUtils');

// import passport configuration
require('../config/passport');

// currently, REST API will handle the authentication since it's much simpler and secure than handling with graphql
restRouter.post('/login',passport.authenticate('local'),(req,res)=>{
    res.status(400).send({msg: "Successfully login"});
});


restRouter.post('/register', async (req,res)=>{
    const password = req.body.password;
    const email = req.body.email;

    const saltHash = genSaltHash(password);
    const newArgs = {
        email,
        ...saltHash
    };

    try {
        await User.create(newArgs);
        res.status(200).send({msg: "Successfully created user"});
    }
    catch(error) {
        res.status(409).send({msg: "Email already existed"});
    }

});

restRouter.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            res.status(500).send({msg: "Internal error"});
            return next(err);
        }
        res.status(200).send({msg: "Successfully logout"});
    });
});

module.exports = restRouter;