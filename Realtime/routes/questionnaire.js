var express = require('express');
var router = express.Router();
const io = require('../socket').connection;

router.post('/questionnaire', function(req, res) { 
  req.app.io.emit('questionnaire', { questionnaire: req.body });

  res.send("ACK");
});

module.exports = router;