import m from 'mithril';
import Nav from '../../components/Nav/Nav.js';
import LeftBar from '../../components/LeftBar/LeftBar.js';
import RightBar from '../../components/RightBar/RightBar.js';
import Commits from '../../components/Commits/Commits.js';
import TreePanel from '../../components/TreePanel/TreePanel.js';
import Tree from '../../model/Tree.js';
import state from '../../model/State.js';
import Editor from '../../components/Editor/Editor.js';
import AceDiff from '../../components/Diff/AceDiff';
import styles from './diff.css';

var Index = module.exports = {
	controller: function(){
	},
	view: function() {
		var differFn = function() {
			return new AceDiff({
					  mode: "ace/mode/javascript",
					  left: {
					    id: "left-editor",
					    content: "your first file content here\nconsole.log(abc)\nabc",
					    copyLinkEnabled: false
					  },
					  right: {
					    id: "right-editor",
					    content: "your second file content here\nconsole.log(abc)",
					    copyLinkEnabled: false
					  }
					});
		};
		
		return [
				m.component(Nav),
				m('.mainBoard', {class: styles.mainBoard},[
					state.treeState?m.component(TreePanel): '',
					m('div', {class: styles.diffContainer}, [
						m('#left-editor', {class: styles.editor}),
						m('#acediff-gutter', {class: styles.gutter}),
						m('#right-editor', {
							class: styles.editor,
							config: differFn
						})
					])
				]),
				m('.sidebar', [
					m.component(LeftBar),
					m.component(RightBar),
					state.commitsState?m.component(Commits): ''
				])
			];
	}
}