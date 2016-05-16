import m from 'mithril';
import styles from './Tree.css';
import TreeModel from '../../model/Tree.js';

var Tree  = module.exports = {
    controller: function() {
        TreeModel.init().list();
    },
    view: function(ctrl) {
        return m("div", {}, [
            m('div', {class: styles.folder}, [
                m('div', [
                    m('i.fa.fa-caret-down'),
                    m('i.fa.fa-folder-open-o'),
                    'git-history'
                ]),

                m('div', [
                    m('div', [
                        m('i.fa.fa-caret-right'),
                        m('i.fa.fa-folder-open-o'),
                        'src'
                    ]),
                    m('div', [
                        m('i.fa.fa-caret-right'),
                        m('i.fa.fa-folder-open-o'),
                        'images'
                    ]),
                    m('div', [
                        m('i.fa.fa-file-text-o'),
                        'index.html'
                    ]),
                    m('div', [
                        m('i.fa.fa-file-text-o'),
                        '.gitignore'
                    ])
                ])
            ])
        ])
    }
};
