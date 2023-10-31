-- Add your SQL statements in here

CREATE TABLE LISTS (
    ID INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
    URL_ID TEXT NOT NULL,
    NAME TEXT NOT NULL
);

CREATE TABLE TODOS (
    ID INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
    LIST_ID INTEGER NOT NULL,
    TASK TEXT NOT NULL,
    COMPLETE BOOLEAN,
    FOREIGN KEY (LIST_ID) REFERENCES LISTS (ID)
);

INSERT INTO LISTS (
    ID,
    URL_ID,
    NAME
) VALUES (
    1,
    'default',
    'Default'
);

INSERT INTO LISTS (
    ID,
    URL_ID,
    NAME
) VALUES (
    2,
    'shopping',
    'Shopping List'
);

INSERT INTO TODOS (
    ID,
    LIST_ID,
    TASK,
    COMPLETE
) VALUES (
    1,
    1,
    'Learn some HTML',
    TRUE
);

INSERT INTO TODOS (
    ID,
    LIST_ID,
    TASK,
    COMPLETE
) VALUES (
    2,
    1,
    'Learn some CSS',
    TRUE
);

INSERT INTO TODOS (
    ID,
    LIST_ID,
    TASK,
    COMPLETE
) VALUES (
    3,
    1,
    'Become a full fullstack developer',
    FALSE
);

INSERT INTO TODOS (
    ID,
    LIST_ID,
    TASK,
    COMPLETE
) VALUES (
    4,
    2,
    'Buy some milk',
    FALSE
);

INSERT INTO TODOS (
    ID,
    LIST_ID,
    TASK,
    COMPLETE
) VALUES (
    5,
    2,
    'Buy some bananas',
    FALSE
);

INSERT INTO TODOS (
    ID,
    LIST_ID,
    TASK,
    COMPLETE
) VALUES (
    6,
    2,
    'Buy some red velvet cake',
    FALSE
);
