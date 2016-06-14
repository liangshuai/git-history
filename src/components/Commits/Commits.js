import m from 'mithril';
import styles from './Commits.css';
import CommitModel from '../../model/Commit.js';
import Tree from '../../model/Tree';
import state from '../../model/State.js';

var CommitContainer = module.exports = {
	_current: 'CommitContainer',
	controller: function() {
		this.list =  CommitModel.list();
	},

	view: function(ctrl) {
		return m("div", {
			class: styles.container
		}, [
			CommitList(ctrl.list())
		]);
	}
};

function diffTransformer(response) {
    return Tree.diff().then(function(diff) {
        return response;
    });
}

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
		m('div', {
			class: styles.committerField
		}, [
			m('div', {
				class: styles.subject
			}, nodeData.commitSubject),
			m('span', {
				class: styles.committer
			}, nodeData.committer),
			m('span', {
				class: styles.commitDate
			}, ' Committed ' + nodeData.commitRelateDate),
		]),
		m('div', {
			class: styles.buttons
		}, [
			m('a', {
				class: [styles.commitId, styles.linkButton].join(' ')
			}, nodeData.commitId.substr(0, 7)),
			m('a.fa.fa-bars', {
				class: [styles.btnCheckout, styles.linkButton].join(' '),
				onclick: function() {
					Tree.list(diffTransformer);
				}
			}, '')
		])
	]);
}