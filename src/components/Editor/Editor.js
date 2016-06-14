import m from 'mithril';
import ace from 'brace';
import aceJavaScript from 'brace/mode/javascript';
import themeMonokai from 'brace/theme/monokai';
import styles from './editor.css';
import state from '../../model/State.js';
import File from '../../model/File.js';

var Editor = module.exports = {
	controller: function() {
		var self = this;
		var file = state.activeDirOrFile;
	},
	view: function(ctrl) {
		var editorRender = function() {
			var editor = ace.edit('javascript-editor');
			editor.getSession().setMode('ace/mode/javascript');
			editor.getSession().setUseWorker(false);
			editor.setTheme('ace/theme/monokai');
			editor.renderer.updateFull();
			editor.setFontSize(14);
			editor.getSession().setValue(result);
		}

		var result = File.Data();
		return  m('#javascript-editor', {
					class: styles.editor,
					config: editorRender
				}, result);
	}
}