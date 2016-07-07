import m from 'mithril';
import state from './State';

var Clone = function(data) {
}

Clone.repoUrl = m.prop('');

Clone.clone = function() {
	return m.request({method: "GET", url: "/git/clone?url=" + Clone.repoUrl()}).then(function(res) {
		state.isCloned = true;
		window.localStorage.setItem('isCloned', true);
		m.route('/');
	}).catch(function(error) {
		alert(error);
	});
}

module.exports = Clone;