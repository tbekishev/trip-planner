const express = require('express');
const router = express.Router();

/* GET users listing. */
module.exports = ({ registerUser }) => {

router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  registerUser(firstName, lastName, email, password).then((data) =>
  res.send(data ? `success: ${data}` : null)
  );
});
  return router;
};