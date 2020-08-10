CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id UUID NOT NULL PRIMARY KEY,
    content VARCHAR(255)
);