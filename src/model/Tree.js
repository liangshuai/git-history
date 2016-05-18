import m from 'mithril';

var Tree = function(data) {
}

var adapter = function(obj, result) {
	result = result || {};
	for(var key in obj) {
		if(key === 'files') {
			obj[key].forEach(function(elem) {
				Array.prototype.push.call(result, {
					name: elem,
					active: false
				});
			});
		}else {
			var currentFolder = Array.isArray(result)?{}:result;
			currentFolder.name = key;
			currentFolder.active = false;
			currentFolder.toggle = false;
			currentFolder.children = new Array();
			Array.isArray(result) && Array.prototype.push.call(result, currentFolder);
			adapter(obj[key], currentFolder.children);
		}
	}

	return result;
}

Tree.list = function(data) {
	var model = {};


	return m.request({method: "GET", url: "/git/files"}).then(function(res) {
		return adapter(res);
	});
}

module.exports = Tree;