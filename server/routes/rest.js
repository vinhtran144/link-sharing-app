const express = require('express');
const restRouter = express.Router();
const passport = require('passport');

// import passport configuration
require('../config/passport');

// currently, REST API will handle the authentication since it's much simpler and secure than handling with graphql
// In the future it can be expanded to handle others REST operation
restRouter.post('/login',(req,res,next)=>{
    console.log(req.body);
    passport.authenticate('local', function (err, user, info) {
        // Currently only uses console.log, in the future can return JSON for status and messages
        if (err) {
            console.log(err);
        }
        if (user) {
            console.log('login successfully');
        } else {
            console.log(info);
        }
    })(req,res,next);
});

restRouter.get('/logout', (req, res, next) => {
    req.logout();
    // res.redirect('/');
});

module.exports = restRouter;