-- Drop and recreate attractions table

DROP TABLE IF EXISTS attractions CASCADE;
CREATE TABLE attractions (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  city VARCHAR(255),
  rate FLOAT,
  average_budget FLOAT,
  photo_url STRING
);