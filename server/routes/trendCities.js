const router = require("express").Router();

module.exports = db => {
  router.get("/trend/city", (request, response) => {
    db.query(
      `
      SELECT name, COUNT(*) as count
      FROM plans
      GROUP BY name
      ORDER BY COUNT
      LIMIT 5;
    `
    ).then((data) => {
      response.json(data.rows);
    });
  });

  return router;
};