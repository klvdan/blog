const path = require('path');

module.exports = {
    title: '牧云客',
    description: '技术宅的笔记',
    head: [
        ['link', { rel: 'icon', href: '/logo.svg'}]
    ],
    dest: path.join(path.dirname(path.dirname(__dirname)), 'dist'),
    theme: './theme',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '随笔', link: '/article/' },
            { text: '技术', link: '/post/' },
            { text: 'Github', link: 'https://github.com/klvdan', target: '_blank' },
        ],
    },
    port: 9999
}