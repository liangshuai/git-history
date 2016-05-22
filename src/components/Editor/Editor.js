import m from 'mithril';
import ace from 'brace';
import aceJavaScript from 'brace/mode/javascript';
import themeMonokai from 'brace/theme/monokai';
import styles from './editor.css';
import state from '../../model/State.js';

var Editor = module.exports = {
	controller: function() {

	},
	view: function(ctrl) {
		var editor = function() {
			var editor = ace.edit('javascript-editor');
			editor.getSession().setMode('ace/mode/javascript');
			editor.setTheme('ace/theme/monokai');
		}
		console.log(state);
		return m('#javascript-editor', {
						class: styles.editor,
						config: editor
					});
	}
}