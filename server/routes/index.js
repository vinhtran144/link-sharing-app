const graphQLrouter = require('./grapghql');
const restRouter = require('./rest');

const express = require('express');
const routes = express.Router();

// REST API will handle all the authentication work, which is much simpler than intergrating
// securities option inside graphql resolvers
routes.use(restRouter);

// Putting graphql router behind authenticate middleware to protect graphql request
routes.use((req,res,next) => {
    if (req.isAuthenticated() || process.env.NODE_ENV === 'development') {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authenticated' });
    }
},graphQLrouter);

// everything after this will need to be authenticated

module.exports = routes;