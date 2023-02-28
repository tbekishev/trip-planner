const router = require("express").Router();

module.exports = db => {
  router.get("/trend-attarctions", (request, response) => {
    db.query(
      `
      SELECT *
      FROM attractions
      ORDER BY rate desc
      LIMIT 3;
    `
    ).then((data) => {
      response.json(data.rows);
      // console.log (data, "data")
    });
  });

  return router;
};

