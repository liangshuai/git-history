import m from 'mithril';
import _ from '../util/util';
import state from './State';

var Diff = function(data) {
}

Diff.Left = m.prop({});
Diff.Right = m.prop({});

Diff.getLeftContent = function(filename) {
	return m.request({method: "GET", url: "/git/file/" + filename}).then(function(res) {
		Diff.Left(res.data);
		return res;
	});
}

Diff.getRightContent = function(commitID, filename) {
	var pathArr = filename.split('/');
	pathArr.shift();
	filename = pathArr.join('/');
	return m.request({method: "GET", url: "/git/show/" + commitID + "/" + filename}).then(function(res) {
		Diff.Right(res.data);
		return res;
	});
}

Diff.compare = function(filename) {
	Diff.getLeftContent(filename);
	Diff.getRightContent('7b918b305e11df', filename);
}



module.exports = Diff;