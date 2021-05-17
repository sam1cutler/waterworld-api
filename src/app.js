require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

/*-- require Routers --*/
const moviesRouter = require('./endpoint_movies/movies-router');

/*-- define app + middleware --*/
const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'dev' ;

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, you!');
})

/*-- use Routers --*/
app.use('/api/movies', moviesRouter);

app.use((error, req, res, next) => {
    let response
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' }}
    } else {
      response = { error }
    }
    res.status(500).json(response)
})

module.exports = app;