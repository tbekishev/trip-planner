const router = require("express").Router();

module.exports = db => {
  router.get("/trend-attrctions", (request, response) => {
    db.query(
      `
      SELECT *
      FROM attractions
      ORDER BY rate desc
      LIMIT 5;
    `
    ).then((data) => {
      response.json(data.rows);
      console.log (data, "data")
    });
  });

  return router;
};

