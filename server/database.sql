CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id UUID PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    content VARCHAR(255),
    owner UUID REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE users(
    user_id UUID PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- fake data --

INSERT INTO users (user_name, user_email, user_password) 
VALUES('John Doe', 'djohn@gmail.com', '12345');

INSERT INTO todo (content, owner) 
VALUES('John's first todo.', '123');