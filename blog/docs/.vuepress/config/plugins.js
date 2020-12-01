module.exports = [
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

	],
	['@vuepress/back-to-top'],
	['@vssue/vuepress-plugin-vssue', {
		// 设置 `platform` 而不是 `api`
		platform: 'github-v4',
		// 其他的 Vssue 配置
		owner: 'zhanghan19',
		repo: 'blog',
		autoCreateIssue: true,
		clientId: '354ee3e8ecc8d75e0559',
		clientSecret: 'c6dab8a134e793da6bfedd40f8f4b6eef3fd1a44',
	}]
]
