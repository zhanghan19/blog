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
			}
		]
	},
	{
		text: '语言',
		items: [{
				text: 'javascript',
				link: '/language/javascript/',
				sidebar: true
			},
			{
				text: 'c',
				link: '/language/c/',
				sidebar: true
			},
			{
				text: 'python',
				link: '/language/python/',
				sidebar: true
			},
		]
	},
	{
		text: '网站构建',
		link: '/construct/'
	},
	{
		text: '简历',
		link: '/resume/'
	},
	{
		text: 'External',
		link: 'https://google.com'
	},
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
	themeConfig: {
		nav: nav,
		sidebarDepth: 3,
		lastUpdated: 'Last Updated', // string | boolean
		sidebar: sidebar(nav)
	},
	plugins: ['@vuepress/back-to-top'],
	markdown: {
	    lineNumbers: true
	}

}
