import m from 'mithril';
import cx from 'classnames';
import styles from './Tree.css';
import TreeModel from '../../model/Tree.js';
import state from '../../model/State.js';
import File from '../../model/File.js';
import CONF from '../../config/config';
import _ from '../../util/util';

var TreeElem = {
    view: function(ctrl, obj) {
        var template = function(item) {
            return m('li',  [
                            m('div', {class: cx(styles.treeWholeRow, {
                                'active': state.activeDirOrFile === _.replacePath(item.path)
                            }), onclick: function() {
                                state.activeDirOrFile = _.replacePath(item.path);
                                if(item.children) {
                                    item.toggle = !item.toggle;
                                    item.active = true;
                                }else {
                                    File.content(state.activeDirOrFile);
                                }
                             }}),
                            m('div', {class: cx(styles.rowText, {
                                'modified': item.name.startsWith(CONF.FILE_STATE_MODIFIED_PREFIX),
                                'deletion': item.name.startsWith(CONF.FILE_STATE_DELETION_PREFIX),
                                'created': item.name.startsWith(CONF.FILE_STATE_CREATED_PREFIX)
                            })}, [
                                item.children?(item.toggle ? m('i.fa.fa-caret-down'): m('i.fa.fa-caret-right')): '',
                                item.children? m('i.fa.fa-folder-open-o') : m('i.fa.fa-file-text-o'),
                                item.name.replace(/__GH__FILE__(.*?)__STATE__(.*?)/, '$2')
                            ]),
                            item.children && item.toggle?m.component(TreeElem, item.children): ''
                        ]);
        }

        return m("ul", [
                Array.isArray(obj) ? (
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