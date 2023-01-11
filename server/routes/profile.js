const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const query = {
      text: `
        SELECT * FROM 
    users JOIN plans ON plans.user_id = users.id 
    JOIN visits ON visits.user_id = users.id 
    JOIN attractions ON visits.attraction_id= attractions.id
    WHERE users.id = $1;
      `,
      values: [user_id],
    };
    return db
      .query(query.text, query.values)
      .then((result) => {
        let data = result.rows
        res.json({data: data})
      })

      .catch((err) => {
        err
      });
   
  });
  return router;
};

