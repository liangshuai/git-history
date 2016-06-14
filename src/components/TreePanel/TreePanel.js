import m from 'mithril';
import styles from './TreePanel.css';
import Tree from '../Tree/Tree.js';
import TreeModel from '../../model/Tree.js';

var TreePanel = module.exports = {
    controller: function() {
    },

    view: function(ctrl) {
        return m("section", {class: styles.treePanel}, [
            m('div', {class: styles.toolBar}, [
                m('ul', {class: styles.toolBarCommands}, [
                    m('li', {class: styles.toolBarCommand}, [
                        m('i.fa.fa-refresh.pointer', {
                            onclick: function() {
                                TreeModel.Data({});
                                setTimeout(TreeModel.list);
                            }
                        })
                    ])
                ])
            ]),
            m.component(Tree)
        ]);
    }
};