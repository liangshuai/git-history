import m from 'mithril';
import Nav from '../../components/Nav/Nav.js';
import LeftBar from '../../components/LeftBar/LeftBar.js';
import styles from './index.css';


var Index = module.exports = {

	view: function() {
		return [
				m.component(Nav),
				m('.mainBoard', {class: styles.mainBoard},[
					m('h1', 'Index Page')
				]),
				m('.sidebar', [
					m.component(LeftBar)
				])
			];
	}
}