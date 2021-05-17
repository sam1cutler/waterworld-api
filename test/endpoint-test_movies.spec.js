const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Movies Endpoints', () => {

    // instantiate database
    let db;

    // create core test data corpus
    const testMovies = helpers.makeMoviesArray();

    before('Make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    })

    before('Cleanup', () => helpers.cleanTables(db));

    after('Disconnect from db', () => db.destroy());

    afterEach('Cleanup', () => helpers.cleanTables(db));

    describe(`GET /api/movies`, () => {
        context(`Given movies in db`, () => {
            beforeEach(`insert movies`, () => {
                return db
                    .into('waterworld_movies')
                    .insert(testMovies)
            })

            it(`responds with 200 and all the movies`, () => {
                const expectedMovies = testMovies.map(helpers.serializeMovieData);

                return supertest(app)
                    .get('/api/movies/')
                    .expect(200, expectedMovies);
            })
        })
    })
    
    describe(`POST /api/movies`, () => {
        context(`Given movies in db`, () => {
            beforeEach('Insert movies', () => {
                return db
                    .into('waterworld_movies')
                    .insert(testMovies)
                    .then( () => {
                        return db.max('id').from('waterworld_movies')
                    })
                    .then( (maxId) => {
                        return db.raw(
                            `ALTER SEQUENCE
                                waterworld_movies_id_seq
                                RESTART WITH ${maxId[0].max+1}
                            `
                        )
                    })
            })

            it(`responds with 201 and adds new user`, () => {
                const newMovie = {
                    "Title": "Louise's Waterworld",
                    "Year": 1997,
                    "imdbID": "tt0298417"
                }
                
                return supertest(app)
                    .post('/api/movies')
                    .send(newMovie)
                    .expect(201)
            })
        })
    })

    describe(`DELETE /api/movies/:showId`, () => {
        context(`Given movies in the db`, () => {
            beforeEach(`insert movies`, () => {
                return db
                    .into('waterworld_movies')
                    .insert(testMovies)
            })

            it(`responds with 204`, () => {
                return supertest(app)
                    .delete('/api/movies/3')
                    .expect(204)
            })
        })
    })

    describe(`PATCH /api/movies/3`, () => {
        context(`Given movies in the db`, () => {
            beforeEach(`insert movies`, () => {
                return db 
                    .into('waterworld_movies')
                    .insert(testMovies)
            })

            it(`update movie info, respond with 204`, () => {
                const updatedMovie = {
                    "Title": "Louise's Waterworld",
                    "Year": 1997,
                    "imdbID": "tt0298417"
                }

                return supertest(app)
                    .patch('/api/movies/3')
                    .send(updatedMovie)
                    .expect(204)
            })
        })
    })

})