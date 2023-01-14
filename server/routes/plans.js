const express = require('express');
const router = express.Router();

module.exports = ({ addLocation }) => {

router.post('/', (req, res) => {
  const { name, start_date, end_date, user_id, location_id, locationName, cityName, rate, average_budget } = req.body;
  addLocation(name, start_date, end_date, user_id, location_id, locationName, cityName, rate, average_budget).then((data) =>
  res.send(data ? `success: ${data}` : null)
  );
});
  return router;
};