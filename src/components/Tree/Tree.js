import m from 'mithril';
import R from 'ramda';
import styles from './Tree.css';
import TreeModel from '../../model/Tree.js';

var TreeElem = {
    view: function(ctrl, obj) {

        var template = function(item) {
            return m('li' + (item.active? '.active':''),  [
                            m('div', {class: styles.treeWholeRow, onclick: function() { item.toggle = !item.toggle; item.active = true; }}),
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

        self.list = TreeModel.list().then(function(res) {
            res.toggle = true;
            return res;
        });
    },

    view: function(ctrl) {

        return m.component(TreeElem, ctrl.list());
    }
};
