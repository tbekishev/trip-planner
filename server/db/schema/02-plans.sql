-- Drop and recreate plans table

DROP TABLE IF EXISTS plans CASCADE;
CREATE TABLE plans (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  start_date DATE,
  end_date DATE,
  starting_time VARCHAR(255),
  ending_time VARCHAR(255),
  group_size INTEGER
);