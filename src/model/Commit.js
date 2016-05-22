import m from 'mithril';

var Commit = function(data) {
}

Commit.list = function(data) {
	var model = {};

	return m.request({method: "GET", url: "/git/commits"}).then(function(res) {
		return res;
	});
}

module.exports = Commit;