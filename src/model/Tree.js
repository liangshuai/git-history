import m from 'mithril';

var Tree = function(data) {
	this.data = data;
}

Tree.init = function(data) {
	return m.request({method: "GET", url: "/git/files", type: Tree});
}

Tree.list = function() {
	return this.data;
}

module.exports = Tree;