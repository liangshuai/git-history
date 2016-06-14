import m from 'mithril';
import R from 'ramda';
import cx from 'classnames';
import styles from './Tree.css';
import TreeModel from '../../model/Tree.js';
import state from '../../model/State.js';
import File from '../../model/File.js';

var TreeElem = {
    view: function(ctrl, obj) {
        var template = function(item) {
            return m('li',  [
                            m('div', {class: cx(styles.treeWholeRow, {
                                'active': state.activeDirOrFile === item.path
                            }), onclick: function() {
                                state.activeDirOrFile = item.path;                           
                                if(item.children) {
                                    item.toggle = !item.toggle;
                                    item.active = true;
                                }else {
                                    File.content(state.activeDirOrFile);
                                }
                             }}),
                            m('div', {class: styles.rowText}, [
                                item.children?(item.toggle ? m('i.fa.fa-caret-down'): m('i.fa.fa-caret-right')): '',
                                item.children? m('i.fa.fa-folder-open-o') : m('i.fa.fa-file-text-o'),
                                item.name
                            ]),
                            item.children && item.toggle?m.component(TreeElem, item.children): ''
                        ]);
        }

        return m("ul", [
                R.is(Array, obj)? (
                    obj.map(function(elem) {
                        return template(elem);
                    })
                ) : (template(obj))

            ]);
    }
}

var Tree  = module.exports = {
    controller: function() {
        var self = this;
        self.list = TreeModel.list();
    },

    view: function(ctrl) {
        return m.component(TreeElem, TreeModel.Data());
    }
};