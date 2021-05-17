const express = require('express');

const moviesRouter = express.Router();

moviesRouter
    .route('/')
    .get( (req, res, next) => {
        res.send('Found the movies!');
    })

module.exports = moviesRouter;