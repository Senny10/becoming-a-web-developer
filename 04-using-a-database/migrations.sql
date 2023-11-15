-- For table creation
CREATE TABLE lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    url_id TEXT NOT NULL,
    name TEXT NOT NULL
);
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    list_id INTEGER NOT NULL,
    task TEXT NOT NULL,
    complete BOOLEAN,
    FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE RESTRICT
);
CREATE UNIQUE INDEX uidx_lid ON lists (url_id);
