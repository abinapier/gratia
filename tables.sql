CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE journalEntry (
    id SERIAL PRIMARY KEY,
    dateAdded DATE NOT NULL,
    content TEXT,
    usersID INT REFERENCES users(id) NOT NULL
);