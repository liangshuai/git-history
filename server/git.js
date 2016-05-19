var express = require('express');
var router = express.Router();
var files = require('./mock/files');
var commits = require('./mock/commits');


console.log('git in');

router.get('/files', function(req, res) {
	console.log(files);
	res.send(files);
});

router.get('/commits', function(req, res) {
	res.send(commits);
});

module.exports = router;