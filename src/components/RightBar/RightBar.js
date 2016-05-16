import m from 'mithril';
import globalStyles from './../../style/index.css';
import styles from './RightBar.css';

var rightBar = module.exports = {
	controller: function() {},

	view: function(ctrl) {
		return m("div", {
			class: styles.rightBar
		}, [
			m('div', {
				class:  [styles.toolButton, globalStyles.pointer].join(' ')
			}, [
				m('i.fa.fa-list'),
				m('span', 'Commits')
			])

		]);
	}
};