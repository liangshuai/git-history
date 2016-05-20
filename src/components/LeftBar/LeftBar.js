import m from 'mithril';
import cx from 'classnames';
import styles from './LeftBar.css';
import state from '../../model/State.js';

var LeftBar = module.exports = {
    controller: function() {
    },

    view: function(ctrl) {
        return m("div", {class: styles.leftBar}, [
            m('div.pointer', {
                class: styles.toolButton,
                onclick: function() {
                    state.treeState = !state.treeState;
                }
            }, [
                m('i.fa.fa-github'),
                m('span', 'Project')
            ])
        ]);
    }
};