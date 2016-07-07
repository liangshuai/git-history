import m from 'mithril';
import Nav from '../../components/Nav/Nav.js';
import LeftBar from '../../components/LeftBar/LeftBar.js';
import RightBar from '../../components/RightBar/RightBar.js';
import Commits from '../../components/Commits/Commits.js';
import TreePanel from '../../components/TreePanel/TreePanel.js';
import Tree from '../../model/Tree.js';
import styles from './index.css';
import state from '../../model/State.js';
import Editor from '../../components/Editor/Editor.js';
import Diff from '../../components/Diff/Diff.js';

var Index = module.exports = {
	controller: function(){
		 !state.isCloned && !window.localStorage.getItem('isCloned') && m.route('/clone');
	},
	view: function() {
		return [
				m.component(Nav),
				m('.mainBoard', {class: styles.mainBoard},[
					state.treeState?m.component(TreePanel): '',
					state.diffMode?m.component(Diff):m.component(Editor)
				]),
				m('.sidebar', [
					m.component(LeftBar),
					m.component(RightBar),
					state.commitsState?m.component(Commits): ''
				])
			];
	}
}