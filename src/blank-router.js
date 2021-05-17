const express = require('express');

const blankRouter = express.Router();

blankRouter
    .route('/')
    .get( (req, res, next) => {
        res.send('Found the blank endpoint!');
    })

module.exports = blankRouter;