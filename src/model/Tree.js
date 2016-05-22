import m from 'mithril';

var Tree = function(data) {
}

var adapter = function(obj, result, prev) {
	result = result || {};
	for(var key in obj) {
		if(key === 'files') {
			obj[key].forEach(function(elem) {
				Array.prototype.push.call(result, {
					name: elem,
					active: false,
					path: prev? prev + '/' + elem : elem
				});
			});
		}else {
			var currentFolder = Array.isArray(result)?{}:result;
			currentFolder.name = key;
			currentFolder.path = prev? prev  + '/' + key : key;
			currentFolder.active = false;
			currentFolder.toggle = false;
			currentFolder.children = new Array();
			Array.isArray(result) && Array.prototype.push.call(result, currentFolder);
			adapter(obj[key], currentFolder.children, currentFolder.path);
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