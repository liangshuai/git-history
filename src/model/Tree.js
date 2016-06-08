import m from 'mithril';

var Tree = function(data) {
}

var sortKeys = function(obj, sortFun) {
    return Object.keys(obj).sort(sortFun).reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

var adapter = function(obj, result, prev) {
	result = result || {};

	obj = sortKeys(obj, function(a,b) {
		return a !== 'files'? 0 : 1;
	});

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
		var result = adapter(res);
		return result;
	});
}

module.exports = Tree;