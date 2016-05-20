var express = require('express');
var router = express.Router();
var files = require('./mock/files');

router.get('/files', function(req, res) {
	res.send(files);
});

module.exports = router;