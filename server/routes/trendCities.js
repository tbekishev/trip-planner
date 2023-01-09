const router = require("express").Router();

module.exports = db => {
  router.get("/trend", (request, response) => {
    db.query(
      `
      SELECT name, COUNT(*) as count
      FROM plans
      GROUP BY name;
    `
    ).then((data) => {
      response.json(data.rows);
    });
  });

  return router;
};