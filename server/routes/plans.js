const express = require('express');
const router = express.Router();

module.exports = ({ addLocation }) => {

router.post('/', (req, res) => {
  const { user_id, locationName, cityName, rate, photo_url, plan_date } = req.body;
  addLocation(user_id, locationName, cityName, rate, photo_url, plan_date).then((data) =>
  res.send(data ? `success: ${data}` : null)
  );
});
  return router;
};