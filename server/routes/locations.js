const express = require('express');
const router = express.Router();

/* GET users listing. */
module.exports = ({ reschedule }) => {

router.post('/', (req, res) => {
  const { location_id, new_date } = req.body;
  reschedule(location_id, new_date).then((data) =>
  res.send(data ? `success: ${data}` : null)
  );
});
  return router;
};