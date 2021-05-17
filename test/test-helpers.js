const xss = require('xss');


const testHelpers = {

    serializeMovieData(movie) {
        return {
            id: movie.id,
            Title: xss(movie.title),
            Year: movie.year,
            imdbID: xss(movie.imdbid)
        }
    },

    makeMoviesArray() {
        return [
            {
                "id": 1,
                "title": "Waterworld",
                "year": 1995,
                "imdbid": "tt0114898"
            },
            {
                "id": 2,
                "title": "Waterworld",
                "year": 1995,
                "imdbid": "tt0189200"
            },
            {
                "id": 3,
                "title": "The Making of 'Waterworld'",
                "year": 1995,
                "imdbid": "tt2670548"
            },
            {
                "id": 4,
                "title": "Waterworld 4: History of the Islands",
                "year": 1997,
                "imdbid": "tt0161077"
            },
            {
                "id": 5,
                "title": "Waterworld",
                "year": 1997,
                "imdbid": "tt0455840"
            }
        ] 
    },

    cleanTables(db) {
        return db.transaction(trx => 
            trx.raw(
                `TRUNCATE
                    waterworld_movies
                    RESTART IDENTITY
                `
            )    
        )
    }
}


module.exports = testHelpers;