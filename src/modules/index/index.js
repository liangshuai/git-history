import m from 'mithril';
import Nav from '../../components/Nav/Nav.js';
import LeftBar from '../../components/LeftBar/LeftBar.js';
import RightBar from '../../components/RightBar/RightBar.js';
import Commits from '../../components/Commits/Commits.js';
import TreePanel from '../../components/TreePanel/TreePanel.js';
import Tree from '../../model/Tree.js';
import styles from './index.css';
import state from '../../model/State.js';
import ace from 'brace';
import aceJavaScript from 'brace/mode/javascript';
import themeMonokai from 'brace/theme/monokai';
 



var Index = module.exports = {
	controller: function(){
	},
	view: function() {
		var editor = function() {
			var editor = ace.edit('javascript-editor');
			editor.getSession().setMode('ace/mode/javascript');
			editor.setTheme('ace/theme/monokai');
		}
		return [
				m.component(Nav),
				m('.mainBoard', {class: styles.mainBoard},[
					state.treeState?m.component(TreePanel): '',
					m('#javascript-editor', {
						class: styles.editor,
						config: editor
					})
				]),
				m('.sidebar', [
					m.component(LeftBar),
					m.component(RightBar),
					state.commitsState?m.component(Commits): ''
				])
			];
	}
}