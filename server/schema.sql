CREATE TABLE urls (
	id INTEGER PRIMARY KEY, -- this is an auto incrementing integer
    num TEXT NOT NULL, -- this will be arbitrary length
    shorturl TEXT,
    longurl TEXT
);
