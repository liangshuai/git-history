import m from 'mithril';
import cx from 'classnames';
import styles from './LeftBar.css';

var LeftBar = module.exports = {
    controller: function() {
    },

    view: function(ctrl) {
        return m("div", {class: styles.leftBar}, [
            m('div', {class: styles.toolButton}, [
                m('i.fa.fa-github'),
                m('span', 'Project')
            ])
        ]);
    }
};