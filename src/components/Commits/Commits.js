import m from 'mithril';
import styles from './Commits.css';

var CommitContainer = module.exports = {
	_current: 'CommitContainer',
	controller: function() {},

	view: function(ctrl) {
		var list = [{
			commitId: '885edf7dc899f19f125520a614bd094f1bf64fd7',
			author: 'Shuai_Liang',
			authorEmail: 'Shuai_Liang@epam.com',
			committer: 'Shuai_Liang',
			committerEmail: 'Shuai_Liang@epam.com',
			commitDate: 'Wed May 4 14:10:20 2016 +0800',
			commitRelateDate: '2 weeks ago',
			commitSubject: 'update',
			commitBody: ''
		}, {
			commitId: '8db731d58b7880147bb8f7559cdfe0218535dfdb',
			author: 'liangshuai',
			authorEmail: 'liangshuais@qq.com',
			committer: 'liangshuai',
			committerEmail: 'liangshuais@qq.com',
			commitDate: 'Mon May 2 21:31:48 2016 +0800',
			commitRelateDate: '2 weeks ago',
			commitSubject: 'init',
			commitBody: ''
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
				class: [styles.btnCheckout, styles.linkButton].join(' ')
			}, '')
		])
	]);
}