-- Drop and recreate plans table

DROP TABLE IF EXISTS plans CASCADE;
CREATE TABLE plans (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  start_date DATE,
  end_date DATE,
  create_date TIMESTAMP DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  location_id INTEGER
);