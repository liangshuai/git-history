import m from 'mithril';
import styles from './Commits.css';

var CommitContainer = module.exports = {
	_current: 'CommitContainer',
	controller: function() {},

	view: function(ctrl) {
		var list = [{
			'a': 1
		}];

		return m("div", {
			class: styles.container
		}, [
			CommitList(list)
		]);
	}
};

function CommitList(list) {
	var result = [];

	if (list && list instanceof Array && list.length > 0) {
		for (var i = 0, len = list.length; i < len; i++) {
			var obj = CommitNode(list[i]);
			result.push(obj);
		}
	}

	return m('div', {
		class: styles.list
	}, result);
}

function CommitNode(nodeData) {
	return m('div', {
		class: styles.node
	}, [
		m('i.fa.fa-github', {
			class: styles.portrait
		}),
		m('span', {
			class: styles.subject
		}, 'Commit Subject'),
		m('span', {
			class: styles.committer
		}, 'Commit On'),
		m('span', {
			class: styles.commitDate
		}, 'Committer'),
		m('span', {
			class: styles.commitId
		}, 'CommitID'),
		m('button', {
			class: styles.btnCheckout
		}, 'Checkout')
	]);
}