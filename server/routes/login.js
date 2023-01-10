const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body;

    const queryString = `
      SELECT *
      FROM users
      WHERE email = $1;
    `;

    db.query(queryString, [email]).then((result) => {
      if (result.rows.length === 0) {
        return res.send(null);
      }
      const user = result.rows[0];
      if (!bcrypt.compareSync(password, user.password)) {
        return res.send(null);
      }
      delete user.password;
      return res.status(200).send(user);
    });
  });

  router.get("/", (req, res) => {
    res.send("login get route");
  });
  return router;
};