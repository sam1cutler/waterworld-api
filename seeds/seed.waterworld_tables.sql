BEGIN;

TRUNCATE
    waterworld_movies
    RESTART IDENTITY CASCADE;

INSERT INTO waterworld_movies
    (Title, Year, imdbID)
VALUES
    ('Waterworld', 1995, 'tt0114898'),
    ('Waterworld', 1995, 'tt0189200'),
    ('The Making of ''Waterworld''', 1995, 'tt2670548'),
    ('Waterworld 4: History of the Islands', 1997, 'tt0161077'),
    ('Waterworld', 1997, 'tt0455840'),
    ('Waterworld', 1997, 'tt0390617'),
    ('Swordquest: Waterworld', 1983, 'tt2761086'),
    ('Behind the Scenes of the Most Fascinating Waterworld on Earth: The Great Backwaters, Kerala.', 2014, 'tt5847056'),
    ('Louise''s Waterworld', 1997, 'tt0298417'),
    ('Waterworld', 2001,'tt0381702');

COMMIT;