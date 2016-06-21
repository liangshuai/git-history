import m from 'mithril';
import styles from './clone.css';
import state from '../../model/State.js';
import clone from '../../model/Clone.js';

var Index = module.exports = {
	controller: function(){
	},
	view: function() {
		return m('div', {class: styles.container}, [
				m('div', {class: styles.inner}, [
					m('h2', {class: styles.slogan}, 'Viewing History of Source Code, Learning from it!'),
					m('div', {}, [
						m('input', {
							'placeholder': 'Type your repo url',
							class: styles.repoUrl,
							onchange: m.withAttr("value", clone.repoUrl),
							value: clone.repoUrl()
						}),
						m('button', {
							class: styles.submitBtn,
							onclick: function() {
								if(!clone.repoUrl()){
									alert('Please input repo url');
									return;
								}
								clone.clone();
							}
						}, 'Submit')
					])
				])
			]);
	}
}