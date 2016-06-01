var express = require('express');
var router = express.Router();
var files = require('./mock/files');
var commits = require('./mock/commits');
var FS = require('fs');
var PATH = require('path');
var Git = require('git-command');
var _ = require('./util');

router.get('/files', function(req, res) {
	var repoName = req.session.repoName || 'node-git';

	var git = new Git('./repo/' + repoName);
	git.files().then(list => {
		var result = {};

		result[repoName] = list;
		result = _.sortKeys(result, function(a,b) {
			return a === 'files'? 1 : 0;
		});
		console.log(result);
		res.send(result);
	});
});

router.get('/clone', function(req, res) {
	var repoUrl = req.query.url;
	var git = new Git('./repo');

	git.clone(repoUrl).then(response => {
		var repoName = ''.split.call(repoUrl, '/').pop();
		repoName = ''.split.call(repoName, '.git').shift();
		git.setBaseDir('./repo/' + repoName);
		req.session.repoName = repoName;
		res.send({"message": "success"});
	}).catch(err => {
		res.send({"message": "error"});
	});
});

router.get('/commits', function(req, res) {
	var repoName = req.session.repoName || 'node-git';

	var git = new Git('./repo/' + repoName);
	git.log().then(list => {
		res.send(list);
	}).catch(err => {
		res.send({
			"message": "error"
		});
	});
});

router.get('/file/:path*', function(req, res) {
	var path = req.params.path;
	var addon = req.params['0'];
	var fullPath = addon? path + addon : path;

	FS.readFile( './repo/' + fullPath, 'utf8', function(err, data) {
	    if (err) throw err;
		res.send({data: data});
	});
});

router.get('/diff', function(req, res) {
	var path = req.params.path;
	var addon = req.params['0'];
	var fullPath = addon? path + addon : path;

	FS.readFile( './repo/' + fullPath, 'utf8', function(err, data) {
	    if (err) throw err;
		res.send({data: data});
	});
});

module.exports = router;