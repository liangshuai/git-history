var express = require('express');
var router = express.Router();
var files = require('./mock/files');
var commits = require('./mock/commits');
var FS = require('fs');
var PATH = require('path');


router.get('/files', function(req, res) {
	res.send(files);
});

router.get('/commits', function(req, res) {
	res.send(commits);
});

router.get('/file/:path*', function(req, res) {
	var path = req.params.path;
	var addon = req.params['0'];
	var fullPath = addon? path + addon : path;

	FS.readFile(PATH.join('D:/workspace/', fullPath), 'utf8', function(err, data) {
	    if (err) throw err;
		res.send({data: data});
	});
});

module.exports = router;