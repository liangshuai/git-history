var express = require('express');
var router = express.Router();
var files = require('./mock/files');
var commits = require('./mock/commits');
var FS = require('fs');
var PATH = require('path');
var Git = require('git-command');

router.get('/files', function(req, res) {
	var repoName = req.session.repoName || 'node-git';

	var git = new Git('./repo/' + repoName);
	git.files().then(list => {
		var result = {};

		result[repoName] = list;
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

router.get('/commits/:source', function(req, res) {
	var repoName = req.session.repoName || 'node-git',
		source = req.params.source,
		git = new Git('./repo/' + repoName);

	git.log(source).then(list => {
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
		res.send({data: data.replace('\r', '')});
	});
});

router.get('/show/:commitID/:path*', function(req, res) {
	var commitID = req.params.commitID;
	var path = req.params.path;
	var addon = req.params['0'];
	var fullPath = addon? path + addon : path;
	var repoName = req.session.repoName || 'node-git';
	var git = new Git('./repo/' + repoName);

	git.show(commitID, fullPath).then(response => {
		res.send({"data": response.replace('\\r', '')});
	}).catch(err => {
		res.send({
			"message": "error"
		});
	});
});

router.get('/diff', function(req, res) {
	var repoName = req.session.repoName || 'node-git';
	var git = new Git('./repo/' + repoName);
	var targetCommitId = req.params.commitId;

	git.diff(targetCommitId).then(response => {
		res.send(response);
	}).catch(err => {
		res.send({
			"message": "error"
		});
	});
});

router.get('/checkout/:commitId', function(req, res) {
	var repoName = req.session.repoName || 'node-git';
	var git = new Git('./repo/' + repoName);
	var targetCommitId = req.params.commitId;

	if(typeof git.checkout === 'function'){
		git.checkout(targetCommitId).then(response => {
			res.send(response);
		}).catch(err => {
			res.send({
				"message": "error"
			});
		});
	}
	else {
		res.send({});
	}
});



router.get('/tree/diff', function(req, res) {
	var repoName = req.session.repoName || 'node-git';
	var commitA = req.query.commitA;
	var commitB = req.query.commitB;
	var git = new Git('./repo/' + repoName);

	commitA = commitA || 'HEAD';
	git.diff(commitA, commitB, 's').then(response => {
		res.send(response);
	}).catch(err => {
		res.send({
			"message": "error"
		});
	});
});

module.exports = router;