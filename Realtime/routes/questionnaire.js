var express = require('express');
var router = express.Router();
const io = require('../socket').connection;

router.post('/questionnaire', function(req, res) {
  console.log(req.body); 

  req.app.io.emit('message', "lalaalla");

  res.send("ACK");
});

module.exports = router;