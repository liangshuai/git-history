import m from 'mithril';
import styles from './RightBar.css';
import state from '../../model/State.js';

var rightBar = module.exports = {
	controller: function() {},

	view: function(ctrl) {
		return m("div", {
			class: styles.rightBar
		}, [
			m('div.pointer', {
				class:  styles.toolButton,
				onclick: function() {
					state.commitsState = !state.commitsState;
				}
			}, [
				m('i.fa.fa-list'),
				m('span', 'Commits')
			])

		]);
	}
};