-- Drop and recreate attractions table

DROP TABLE IF EXISTS attractions CASCADE;
CREATE TABLE attractions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  city VARCHAR(255),
  rate FLOAT,
  photo_url VARCHAR,
  plan_date DATE
);