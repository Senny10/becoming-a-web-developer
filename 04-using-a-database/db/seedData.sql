-- For lists creation
INSERT INTO lists (url_id, name)
VALUES ('default', 'Default');
INSERT INTO lists (url_id, name)
VALUES ('shopping', 'Shopping List');
-- For tasks creation
INSERT INTO todos (list_id, task, complete)
VALUES(1, 'Learn some HTML', TRUE);
INSERT INTO todos (list_id, task, complete)
VALUES(1, 'Learn some CSS', TRUE);
INSERT INTO todos (list_id, task, complete)
VALUES (1, 'Become a full fullstack developer', FALSE);
INSERT INTO todos (list_id, task, complete)
VALUES(2, 'Buy some milk', FALSE);
INSERT INTO todos (list_id, task, complete)
VALUES (2, 'Buy some bananas', FALSE);
INSERT INTO todos (list_id, task, complete)
VALUES (2, 'Buy some red velvet cake', FALSE);
