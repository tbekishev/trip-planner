-- Drop and recreate visits table   as a bridge table between plans and attractions 

DROP TABLE IF EXISTS visits CASCADE;
CREATE TABLE visits (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFRENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER REFRENCES plans(id) ON DELETE CASCADE,
  attraction_id INTEGER REFRENCES attractions(id) ON DELETE CASCADE
);