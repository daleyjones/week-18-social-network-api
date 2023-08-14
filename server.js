// importing the express module for creating a server
const express = require('express');

// importing the db module to connect to the database
const db = require('./config/connection');

// importing the routes module for handling API routes
const routes = require('./routes');

// setting the port number for the server
const PORT = 3001;

// creating an instance of the express application
const app = express();

// configuring the middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// attaching the routes middleware to the application
app.use(routes);

// establishing a database connection and strating up the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on port ${PORT}!`);
    });
});