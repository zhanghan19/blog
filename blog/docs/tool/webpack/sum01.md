#### webpack.config.js配置

- entry

- output

- module

- plugins

- devServer

  ```javascript
  // 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点： 只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为： npx webpack-dev-server
  
  devServer: {
      // 项目构建后路径
      contentBase: resolve(__dirname, 'build'),
      // 启动gzip压缩
      compress: true,
      // 端口号
      port: 3000,
      // 自动打开浏览器
      open: true
  }
  ```

  

```javascript
index.js: webpack 入口起点文件

1. 运行指令：
	开发环境： webpack ./src/index.js -o ./build/built.js --mode=development
		      webpack会以  ./src/index.js 为入口文件开始打包，打包后输入到  			                  ./build/built.js 整体打包环境，是开发环境
	生产环境： webpack ./src/index.js -o ./build/built.js --mode=production
              webpack会以  ./src/index.js 为入口文件开始打包，打包后输入到  			                  ./build/built.js  整体打包环境，是生产环境
2. 结论：
	1. webpack能处理js/json资源，不能处理css/img等其他资源
	2. 生产环境和开发环境将ES6模块化编译成浏览器能识别得模块化~
	3. 生产环境比开发环境多一个压缩js代码
    
    

3. webpack.config.js webpack的配置文件
	作用： 指示webpack 干那些活（当你运行 webpack 指令时，会加载里面的配置）
    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs
```

### loader

- css
  - style-loader
  - css-loader
- less 
  - style-loader
  - css-loader
  - less-loader    (依赖   less)
- img
  - url-loader  (依赖   file-loader)
  - html-loader  (处理  html  中的 image )

### plugins

- html-webpack-plugin

- min-css-extract-plugin  （提取css）

  ```javascript
  module.exports = {
      entry: '.src/indx.js',
      output: {
          filename: 'bulit.js',
          path: resolve(__dirname, 'build')
      },
      module: {
          rules: [
              test: /\.css$/,
              use: [
              	minCssExtractPlugin.loader,
              	'css-loader'
          	]
          ]
      },
      plugin: [
          new minCssExtractPlugin({
              filename: 'css/built.css'
          })
      ]
  }
  ```

- css兼容性处理

  ```javascript
  /**
  	postcss ==> postcss-loader postcss-preset-env
  	帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
  	"browserslist": {
  		// 开发环境 ==> 设置node环境变量： process.env.NODE_ENV = 'development'
  		"development":[
  			"last 1 chrome version",
  			"last 1 firefox version",
  			"last 1 safari version"
  		],
  		// 生产环境： 默认是看生产环境
  		"production": [
  			">0.2%",
  			"not dead",
  			"not op_mini all"
  		]
  	}
  */
  module.exports = {
      entry: './src/index.js',
      output: {
          filename: 'js/built.js',
          path: resolve(__dirname, 'build')
      },
      module: {
          rules: [
              {
                  test: /\.css$/,
                  use: [
                      'css-loader',
                      {
                          loader: 'postcss-loader',
                          options: {
                              ident: 'postcss',
                              plugins: () => [
                                  require('postcss-preset-env')()
                              ]
  					  }
                      }
                  ]
              }
          ]
      }
  }
  ```

  

  