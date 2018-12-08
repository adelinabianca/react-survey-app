var express = require('express');
var router = express.Router();
const io = require('../socket').connection;

router.post('/questionnaire', function(req, res) { 
  console.log(req.body);
  req.app.io.emit('questionnaireStatus', { questionnaireStatus: req.body });

  res.send("ACK");
});

module.exports = router;