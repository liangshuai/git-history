import m from 'mithril';
import R from 'ramda';
import styles from './Tree.css';
import TreeModel from '../../model/Tree.js';

var TreeElem = {
    controller: function() {
        return {greeting: "hello"}
    },
    view: function(ctrl, obj) {

        var template = function(item) {
            return m('li', [
                            m('div', {class: 'treeWholeRow'}),
                            m('div', {class: styles.rowText}, [
                                m('i.fa.fa-caret-down'),
                                item.children? m('i.fa.fa-folder-open-o') : m('i.fa.fa-file-text-o'),
                                item.name
                            ]),
                            item.children?m.component(TreeElem, item.children): ''
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
