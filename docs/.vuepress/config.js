const nav = [{
		text: '首页',
		link: '/'
	},
	{
		text: '前端',
		items: [{
				text: 'HTML',
				link: '/front/html/',
				sidebar: true
			},
			{
				text: 'CSS',
				link: '/front/css/',
				sidebar: true
			},
			{
				text: 'javascript',
				link: '/front/javascript/',
				sidebar: true
			},
			{
				text: 'API',
				link: '/front/api/',
				sidebar: true
			},
			{
				text: '浏览器',
				link: '/front/browser/',
				sidebar: true
			},
			{
				text: '组件化',
				link: '/front/component/',
				sidebar: true
			},
			{
				text: '工具链',
				link: '/front/toolchain/',
				sidebar: true
			},
			{
				text: '发布系统',
				link: '/front/pubsys/',
				sidebar: true
			},
			{
				text: '微信小程序',
				link: '/front/applet/',
				sidebar: true
			}
		]
	},
	{
		text: '语言',
		items: [
			// {
			// 	text: 'javascript',
			// 	link: '/language/javascript/',
			// 	sidebar: true
			// },
			{
				text: 'c',
				link: '/language/c/',
				sidebar: true
			},
			{
				text: 'python',
				link: '/language/python/'
			},
		]
	},

	{
		text: '工具',
		items: [{
				text: 'GIT',
				link: '/tool/git/',
				sidebar: true
			},
			{
				text: 'webpack',
				link: '/tool/webpack/',
				sidebar: true
			},
			{
				text: 'nginx',
				link: '/tool/nginx/',
			}
		]

	},
	{
		text: '功能实现',
		items: [{
			text: '功能',
			link: '/func/usually/',
			sidebar: true
		}]
	},
	{
		text: '简历',
		link: '/resume/'
	},
	{
		text: 'github',
		link: 'https://github.com/zhanghan19/blog'
	},
	// {
	// 	text: '网站构建',
	// 	link: '/construct/'
	// },
];

function sidebar(nav) {
	const obj = {};
	const arrSide = []

	function f_cls(nav) {
		nav.forEach(function(item) {
			if (item.items) {
				f_cls(item.items)
			}
			if (item.link && item.sidebar) {
				arrSide.push(item.link)
			}
		})
	}
	f_cls(nav)
	arrSide.forEach(function(item) {
		item = item.substring(0, item.length - 1)
		obj[item] = require('./sidebars' + item)
	})
	return obj
}


module.exports = {
	title: '张寒',
	description: 'Just playing around22',
	// base: '/zhanghan/',
	themeConfig: {
		nav: nav,
		sidebarDepth: 3,
		lastUpdated: 'Last Updated', // string | boolean
		sidebar: sidebar(nav)
	},
	plugins: ['@vuepress/back-to-top'],
	markdown: {
		lineNumbers: true
	},
	plugins: [
		// 你可以多次使用这个插件
		[
			'vuepress-plugin-container',
			{
				type: 'right',
				defaultTitle: '',
			},
		],
		[
			'vuepress-plugin-container',
			{
				type: 'theorem',
				before: info => `<div class="theorem"><p class="title">${info}</p>`,
				after: '</div>',
			},
		],
		[
			'vuepress-plugin-medium-zoom',
			{
				selector: '.my-wrapper .my-img',
				delay: 1000,
				options: {
					margin: 24,
					background: '#fff',
					scrollOffset: 0,
				},
			},
		],
	],

}
