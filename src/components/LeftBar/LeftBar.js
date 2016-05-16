import m from 'mithril';
import styles from './LeftBar.css';

var LeftBar = module.exports = {
    controller: function() {
    },

    view: function(ctrl) {
        return m("div", {class: styles.leftBar}, [
            m('div.pointer', {class: styles.toolButton}, [
                m('i.fa.fa-github'),
                m('span', 'Project')
            ])
        ]);
    }
};