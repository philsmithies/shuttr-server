CREATE TABLE users (
  user_id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR ( 200 ) UNIQUE NOT NULL,
  password VARCHAR (20) NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
);