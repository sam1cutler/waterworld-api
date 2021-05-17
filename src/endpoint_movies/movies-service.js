const xss = require('xss');

const moviesService = {

    serializeMovieData(movie) {
        return {
            id: movie.id,
            Title: xss(movie.title),
            Year: movie.year,
            imdbID: xss(movie.imdbid)
        }
    },

    getAllMovies(knex) {
        return knex
            .select('*')
            .from('waterworld_movies')
    },

    addMovie(knex, newMovie) {
        // console.log(newMovie);
        return knex
            .insert(newMovie)
            .into('waterworld_movies')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteMovie(knex, id) {
        return knex
            .from('waterworld_movies')
            .where( {id} )
            .delete()
    },

    updateMovie(knex, id, newData) {
        // console.log(newData);
        return knex
            .from('waterworld_movies')
            .where( {id} )
            .update(newData)
    }

}

module.exports = moviesService;