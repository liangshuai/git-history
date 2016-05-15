import m from 'mithril';
import Index from './modules/index/';
import styles from './style/index.css';

m.route.mode = 'pathname';

m.route(document.getElementById('root'), '/', {
	"/": Index
});