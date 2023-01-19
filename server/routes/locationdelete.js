const express = require('express');
const router = express.Router();

module.exports = ({ locationDelete }) => {

router.post('/', (req, res) => {
  const { location_id } = req.body;
  locationDelete(location_id).then((data) =>
  res.send(data ? `success: ${data}` : null)
  );
});
  return router;
};