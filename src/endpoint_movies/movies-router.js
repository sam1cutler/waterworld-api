const express = require('express');
const path = require('path');
const moviesService = require('./movies-service');

const moviesRouter = express.Router();
const jsonParser = express.json();

moviesRouter
    .route('/')
    .get( (req, res, next) => {
        moviesService.getAllMovies(
            req.app.get('db')
        )
        .then( movies => {
            res.json(movies.map(moviesService.serializeMovieData));
        })
        .catch(next);
    })
    .post(jsonParser, (req, res, next) => {

        const { Title, Year, imdbID } = req.body;

        const newMovie = {
            title: Title,
            year: Year,
            imdbid: imdbID
        }

        moviesService.addMovie(
            req.app.get('db'),
            newMovie
        )
            .then(movie => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl), `/${movie.id}`)
                    .json(moviesService.serializeMovieData(movie))
            })
            .catch(next);
    })

moviesRouter
    .route('/:movieId')
    .delete( (req, res, next) => {
        moviesService.deleteMovie(
            req.app.get('db'),
            req.params.movieId
        )
            .then( () => {
                res
                    .status(204)
                    .end()
            })
    })
    .patch(jsonParser, (req, res, next) => {

        const { Title, Year, imdbID } = req.body;

        const updatedShowInfo = {
            title: Title,
            year: Year,
            imdbid: imdbID
        }

        moviesService.updateMovie(
            req.app.get('db'),
            req.params.movieId,
            updatedShowInfo
        )
            .then( () => {
                res.status(204)
                .end()
            })
            .catch(next)

    })

module.exports = moviesRouter;