-- Drop and recreate visits table   as a bridge table between plans and attractions 

DROP TABLE IF EXISTS visits CASCADE;
CREATE TABLE visits (
  id SERIAL PRIMARY KEY NOT NULL,
  plan_id INTEGER REFERENCES plans(id) ON DELETE CASCADE,
  attraction_id INTEGER REFERENCES attractions(id) ON DELETE CASCADE
);