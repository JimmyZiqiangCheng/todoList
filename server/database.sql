CREATE DATABASE perntodo;

-- users --
CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

-- todos --
CREATE TABLE todos(
    todo_id BIGSERIAL,
    user_id UUID,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY(todo_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- fake data --

INSERT INTO users (user_name, user_email, user_password) 
VALUES('John Doe', 'djohn@gmail.com', '12345');