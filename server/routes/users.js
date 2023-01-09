const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
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
    res.send(result ? "success" : null)
    return result.rows[0];
  })
  .catch((err) => {
    console.log("Error: ",err.message);
  });
})
module.exports = router;