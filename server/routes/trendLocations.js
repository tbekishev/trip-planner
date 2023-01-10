const router = require("express").Router();

module.exports = db => {
  router.get("/trend/location", (request, response) => {
    db.query(
      `
      SELECT *
      FROM attractions
      ORDER BY rate desc
      LIMIT 5;
    `
    ).then((data) => {
      response.json(data.rows);
    });
  });

  return router;
};

