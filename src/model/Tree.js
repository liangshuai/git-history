import m from 'mithril';
import _ from '../util/util';
import state from './State';

var Tree = function(data) {
}

Tree.Data = m.prop({});

var adapter = function(obj, result, prev) {
	result = result || {};

	obj = _.sortKeys(obj, function(a,b) {
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

Tree.list = function(transformer) {
	return m.request({method: "GET", url: "/git/files", unwrapSuccess: transformer || _.noop}).then(function(res) {
		var result = adapter(res);
		result.toggle = true;
		Tree.Data(result);
		state.repoName = result.name;
		return result;
	});
}

Tree.diff = function() {
	return m.request({method: "GET", url: "/git/tree/diff"}).then(function(res) {
		return res;
	});
}

module.exports = Tree;