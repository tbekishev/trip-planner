const router = require("express").Router();

module.exports = db => {
  router.get("/plans/:id", (request, response) => {
    // console.log(request.params)
    db.query(
      `
      SELECT *
      FROM attractions
      WHERE user_id = ${request.params.id}
      ORDER BY plan_date;
    `
    ).then((data) => {
      response.json(data.rows);
      // console.log (data, "data")
    });
  });

  return router;
};