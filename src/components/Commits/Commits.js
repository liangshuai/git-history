import m from 'mithril';
import styles from './Commits.css';
import CommitModel from '../../model/Commit.js';
import Tree from '../../model/Tree';
import CONF from '../../config/config';
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

function changeFileNameWithState(dest, elem, type) {
	var mapping = {
		'created': CONF.FILE_STATE_CREATED_PREFIX,
		'deleted': CONF.FILE_STATE_DELETION_PREFIX,
		'modified': CONF.FILE_STATE_MODIFIED_PREFIX
	}
	var prefix = mapping[type];
	var pathArr = elem.split('/');
	var len = pathArr.length;
	var TreeRoot = state.repoName ? dest[state.repoName] : dest;
	pathArr.reduce(function(prev, curr, index) {
		if(index < len - 1) {
			return prev[curr];
		}else {
			var index = prev['files'].indexOf(curr);
			prev['files'][index] = prefix + prev['files'][index];
		}
	}, TreeRoot);
}

function diffTransformer(response) {
    return Tree.diff().then(function(diff) {
    	for(let key in diff) {
			for(let i = 0, len = diff[key].length; i < len; i++){
				changeFileNameWithState(response, diff[key][i], key);
			}
    	}
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