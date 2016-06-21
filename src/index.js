import m from 'mithril';
import Index from './pages/index/';
import Clone from './pages/clone/clone';
import styles from './style/index.css';

m.route.mode = 'pathname';

m.route(document.getElementById('root'), '/clone', {
	"/": Index,
	'/clone': Clone
});