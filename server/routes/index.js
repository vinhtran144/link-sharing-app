const graphQLrouter = require('./grapghql');
const restRouter = require('./rest');

const express = require('express');
const routes = express.Router();

// REST API will handle all the authentication work, which is much simpler than intergrating
// securities option inside graphql resolvers
routes.use(restRouter);

routes.use(graphQLrouter);


module.exports = routes;