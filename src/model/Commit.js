import m from 'mithril';
import state from './State.js';

var Commit = function(data) {
};

Commit.list = function(data) {
	var model = {};

	return m.request({method: "GET", url: "/git/commits/master"}).then(function(res) {
		return res;
	});
};

Commit.diff = function(commitA){
	return m.request({method: "GET", url: "/git/diff"}).then(function(res) {
		// TODO show git diff

		return res;
	});
};

Commit.checkout = function(targetCommit, callback) {
	if (confirm('Are you sure to checkout to commit:' + targetCommit)) {
		return m.request({
			method: "GET",
			url: "/git/checkout/" + targetCommit
		}).then(function(res) {
			// TODO reload the file tree, diff info, HEAD info
			state.currentHead = targetCommit;

			return res;
		});
	}
};


module.exports = Commit;