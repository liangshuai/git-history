import m from 'mithril';
import state from '../../model/State.js';
import DiffModel from '../../model/Diff.js';
import AceDiff from './AceDiff';
import styles from './Diff.css';
import cx from 'classnames';

var Diff = module.exports = {
	controller: function() {
	},
	view: function(ctrl) {
		var differFn = function() {
			return new AceDiff({
					  mode: "ace/mode/javascript",
					  left: {
					    id: "left-editor",
					    content: DiffModel.Left(),
					    copyLinkEnabled: false
					  },
					  right: {
					    id: "right-editor",
					    content: DiffModel.Right(),
					    copyLinkEnabled: false
					  }
					});
		};

		return  m('div', {class:cx(styles.diffContainer, {
                                'toggled': !state.treeState
                            })}, [
					m('#left-editor', {class: styles.editor}),
					m('#acediff-gutter', {class: styles.gutter}),
					m('#right-editor', {
						class: styles.editor,
						config: differFn
					})
				]);
}
}