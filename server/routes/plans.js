const express = require('express');
const router = express.Router();

// module.exports = ({ addLocation }) => {

// router.post('/', (req, res) => {
//   const { name, start_date, end_date, user_id, location_id, locationName, cityName, rate, average_budget } = req.body;
//   addLocation(name, start_date, end_date, user_id, location_id, locationName, cityName, rate, average_budget).then((data) =>
//   res.send(data ? `success: ${data}` : null)
//   );
// });
//   return router;
// };

module.exports = ({ addPlanning }) => {

  router.post('/', (req, res) => {
    const { user_id, name, start_date, end_date, starting_time, ending_time, location_id, group_size } = req.body;
    addPlanning(user_id, name, start_date, end_date, starting_time, ending_time, location_id, group_size).then((data) =>
    res.send(data ? `success: ${data}` : null)
    );
  });
    return router;
};