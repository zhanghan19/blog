
const nav = require('./nav.js')
// const blogConfig = require('./blogConfig.js');
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
		obj[item] = require('../sidebars' + item)
	})
	return obj
}
module.exports = {
  nav,
  sidebarDepth: 3,
  sidebar: sidebar(nav),
  smoothScroll: true,
  lastUpdated: 'Last Updated',
  logo: '/images/resume/avater.jpg',
  lastUpdated: 'Last Updated',
  noFoundPageByTencent: false
}
