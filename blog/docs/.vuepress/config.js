const themeConfig = require('./config/them.js')
const plugins = require('./config/plugins.js')

module.exports = {
	title: '张寒',
	description: 'Just playing around22',
	// base: '/zhanghan/',
	themeConfig,
	plugins: ['@vuepress/back-to-top'],
	markdown: {
		lineNumbers: true
	},
	plugins
}
