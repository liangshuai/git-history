import m from 'mithril';
import Nav from '../../components/Nav/Nav.js';
import LeftBar from '../../components/LeftBar/LeftBar.js';
import TreePanel from '../../components/TreePanel/TreePanel.js';
import Tree from '../../model/Tree.js';
import styles from './index.css';


var Index = module.exports = {
	controller: function(){
	},
	view: function() {
		return [
				m.component(Nav),
				m('.mainBoard', {class: styles.mainBoard},[
					m.component(TreePanel),
					m('h1', 'Index Page')
				]),
				m('.sidebar', [
					m.component(LeftBar)
				])
			];
	}
}