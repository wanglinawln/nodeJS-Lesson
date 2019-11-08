var express = require('express');
var router = express.Router();

/* GET news listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/list', function(req, res, next) {
  res.end('news list');
});

module.exports = router;
