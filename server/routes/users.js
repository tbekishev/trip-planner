const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'travel'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  pool.query(` INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, [firstName, lastName, email, password]
  )
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log("Error: ",err.message);
  });
})
module.exports = router;