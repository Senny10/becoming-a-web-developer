-- Add your SQL statements in here

CREATE TABLE LISTS (
    ID INTEGER PRIMARY KEY,
    URL_ID TEXT NOT NULL,
    NAME TEXT NOT NULL
);

CREATE TABLE TODOS (
    ID INTEGER PRIMARY KEY NOT NULL,
    LIST_ID INTEGER NOT NULL,
    TASK TEXT NOT NULL,
    COMPLETE BOOLEAN,
    FOREIGN KEY (LIST_ID) REFERENCES LISTS (ID)
);
