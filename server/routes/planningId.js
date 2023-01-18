const express = require('express');
const router = express.Router();

module.exports = ({ planningId }) => {
  
  router.get("/", (request, response) => {

      planningId()
      .then((data) => {
      response.send(data);
    });
  });

  return router;
};