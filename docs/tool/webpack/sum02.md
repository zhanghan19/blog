### css处理

- css解析
  - style-loader
  - css-loader
- css提取为单独文件
  - mini-css-extract-plugin
- css兼容
  - postcss-loader
  - postcss-preset-env
- css压缩
  - optimize-css-assets-webpack-plugin

### img处理

- 打包
  - file-loader
  - url-loader
- 处理html中的图片打包
  - html-loader

### 字体处理

- file-loader

### js处理

- js语法检查

  ```javascript
  语法检查： eslint-loader eslint
  注意：只检查源代码，第三方库不检查
  设置检查规则： package.json中eslintConfig中设置~
  "eslintConfig": {
      "extends": "airbnb-base",
      // eslist 不认识 window、navigator全局变量
      // 解决： 需要修改package.json中eslingConfig配置
      "env": {
          "browser": true // 支持浏览器端全局变量
      }
  }
  airbnb ==> eslint-config-airbnb-base eslint-plugin-import eslint
  
  {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {}
  }
  ```

- js兼容处理

  ```javascript
  /*
  	js兼容处理: babel-loader @babel/preset-env @babel/core
  		1. 基本js兼容处理 --> @babel/preset-env
  	 	 	问题：只能转换基本语法，如promise高级语法不能转换
  	 	2. 全部js兼容性处理 --> @babel/polyfill
  	 		问题：我只要解决部分兼容性处理，但是将所有兼容性代码全部引入
  	 	3. 需要做兼容性处理的就做: 按需加载 --> core-js
  		
  */
  {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
          // 预设： 指示babel做怎么样的兼容性处理
          presets: [
              '@babel/preset-env',
          ]
      }
  }
  ```



### html处理

- html压缩

  ```javascript
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
          // 压缩html
          minity: {
              collapseWhitespace: true, // 合并空白
              removeComments: true // 删除注释
          }
      })
  ]
  ```



## webpack性能优化

- 开发环境性能优化
- 生产环境性能优化

### 开发环境性能优化

* 优化打包构建速度

  ```javascript
  /**
  	HMR: hot module replacement 热模块替换 / 模块热替换
  	作用： 一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）极大提升构建速度
  	   
  	样式文件： 可以使用HMR功能：因为style-loader内部实现了（所以开发环境我们使用style-loader,生产环境我们使用 MiniCssExtractPlugin）
  	
  	js文件： 默认不能使用HMR功能  -->  需要修改js代码，添加支持HMR功能的代码
  		注意； HMR功能对js的处理，只能处理非入口js文件的其他文件。
  		
  	html文件: 默认不能使用HMR功能，同时会导致问题: html文件不能热更新了(因为只有一个html所以不需要做)
  		问题： 修改entry入口，将html文件引入
  */
  module.exports = {
      entry: ['./src/js/index.js', './src/index.html']
  }
  
  index.js // 添加如下代码
  if(module.hot) {
      // 一旦 module.hot 为true，说明开启了HMR 功能 --> 让HMR代码生效
      module.hot.accept('./print.js', function () {
          // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
          // 会执行后面的回调函数
          print()
  	})
  }
  ```

* 

* 优化代码调试

  * source-map

    ```javascript
    /**
    	source-map: 一种提供源代码到构建代码映射技术（如果构建代码出错了，通过映射可以追踪源代码错误）
    	[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    	source-map：外部
    		错误代码准确信息 和 源代码的错误位置
    	inline-source-map: 内联
    		1.只生成一个内联source-map
    		错误代码准确信息 和 源代码的错误位置
    	hidden-source-map: 外部
    		错误代码原因，但是没有错误位置
    		不能追踪源代码错误，只能提示到构建后代码的错误位置
    	eval-source-map： 内联
    		每个文件都生成对应的source-map， 都在eval
    		错误代码准确信息 和 源代码的错误位置
    	nosources-source-map: 外部
    		错误代码准确信息，但是没有任何源代码
    	cheap-source-map: 外部
    		错误代码准确信息 和 源代码的错误位置
    		只能精确到行
    	cheap-module-source-map: 外部
    		错误代码准确信息 和 源代码的错误位置
    		module会将loader的source map 加入
    	内联 和外部的区别； 1. 外部生成了文件，内联没有 2. 内联构建速度更快
    	
    	开发环境： 速度快，调试更友好
    		速度快（eval > inline > cheap > ...)
    			eval-cheap-souce-map
    			eval-source-map
    		调试更友好
    			source-map
    			cheap-module-souce-map
    			cheap-souce-map
    		
    		--> eval-source-map  / eval-cheap-module-souce-map
    	生产环境：代码要不要隐藏？调试要不要更友好
    		内联会让代码体积变大，所以在生产环境不用内联
    		nosources-source-map 全部隐藏
    		hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
    		
    		--> source-map / cheap-module-souce-map
    */
    module.exports = {
         devtool: 'source-map'
    }
    ```

    

### 生产环境性能优化

* 优化打包构建速度

  - oneOf

    ```javascript
    // oneOf: 中的loader只会匹配一个
    // 注意: 不能有两个配置处理同一种类型文件
    oneOf: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          }
    ]
    ```

    

  * 缓存

    ```javascript
    babel 缓存
    	cacheDirectory: true
    	---> 让第二次打包构建速度更快
    
    文件资源缓存
    	hash: 每次webpack构建时会生成一个唯一的hash值
        	问题： 因为js和css同时使用一个hash值如果重新打包，会导致所有缓存失效。（可能我指改动一个文件）
        chunkhash: 根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        	问题： js和css的hash值还是一样的。因为css时在js中被引入的，所以同属于一个chunk
         contenthash: 根据文件的内容生成hash值，不同文件hash值一定不一样
     	---> 让代码上线运行缓存更好使用
        
    ```

  * 多进程打包

    ```javascript
    {
        test: /\.js$/,
            exclude: /node_modules/,
                use: [
                    /*
                    	开启多进程打包
                    	进程启动大概率600ms，进程通信也有开销。
                    	只有工作消耗时间比较长，才需要多进程打包
                    */
                    {
                        loader: 'thread-loader',
                        optins: {
                            workers: 2 // 进程2个
                        }
                    }，
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chorme: '60',
                                            firefox: '50'
                                        }
                                    }
                                ]
                            ],
                            // 开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    }
                ]
    }
    ```

  * externals

    ```javascript
    module.exports = {
        externals: {
            // jquery被打包进来
            // 当然需要在html中引入
            jquery: 'jQuery'
        }
    }
    
    // 注意：如果第三方库使用sdn 时我们使用external 如果使用自己的服务器我们使用dll打包
    ```

  * dll

    ```javascript
    webpack.dll.js
    /*
    	使用dll技术，对某些库（第三方库: jquety react vue ...) 进行单独打包
    	当你运行webpack 时，默认查找webpack.config.js配置文件
    	需求： 需要运行 webpack.dll.js
    		---> webpack --config webpack.dll.js
    */
    const {resolve} = require('path');
    const webpack = require('webpack');
    
    module.exports = {
      entry: {
        // 最终打包生成的[name] ---> jquery
        // ['jquery'] ---> 要打包的库是jquery
        jquery: ['jquery']
      },
      output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
      },
      plugins: [
        new webpack.DllPlugin({
          name: '[name]_[hash]', // 映射库的暴露的内容名称
          path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
        })
      ]
    }
    
    webpack.config.js
    module.exports = {
      plugins: [
        // 告诉webpack 那些库不参数与打包，同时使用时的名称也得变
        news webpack.DllReferencePlugin({
          manifest: resolve(__dirname, 'dll/mainfest.json')
        }),
        // 将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname, 'dll/jquery.js')
        })
      ],
      mode: 'production'
    }
    ```

    

* 优化代码运行的性能

  * 缓存（hash-chunkhash-contenthash)

  * tree shaking: 
  
    ```javascript
    tree shaking: 去除无用代码
    前提： 1.必须使用ES6模块话  2. 开启production环境
    作用： 减少代码体积
    
    在package.json中配置
    	"sideEffects": false 所有代码都没有副作用（都可以进行treeshaking）
        问题： 可能会把css/ @babel/polyfill (副作用) 文件干掉
    	"sideEffects": ["*.css"]
    ```

  * code split
  
    ```javascript
    // 方法一：
    module.export = {
        // 单入口
        // entry： '.src/js/index.js'
        entry: {
            // 多入口：有一个入口文件，最终输出就有一个bundle
            main: './src/js/index.js',
            test: './src/js/test.js'
        },
        output: {
            // [name]: 去文件名
            filename: 'js/[name].[contenthash:10].js',
            path: resolve(__dirname, 'build')
        }
    }
    
    // 方法二：
    module.exports= {
        entry: './src/js/index.js',
        output: {
            filename: 'js/[name].[contenthash:10].js',
            path: resolve(__dirname, 'build')
        },
        /**
        	1. 可以将node_modules中代码单独打包一个chunk最终输出
        	2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
        */
        
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    }
    
    // 方法三： 
    
    import(/*webpackChunkName: 'test'*/'./test')
    .then(({mul, count}) => {
        // 文件加载成功
        console.log(mul(2, 5))
    })
    .catch(() => {
        console.log('文件加载失败')
  })
    ```

  * 懒加载/预加载
  
    ```javascript
    document.getElementById('btn').onclick = function() {
        // 懒加载：当文档需要使用时才加载
        // 预加载 prefetch: 会在使用之前，提前加载js文件
        // 正常加载可以认为是并行加载（同一时间加载多个文件）
        // 预加载prefetch：等其他资源加载完毕，浏览器空闲了，在偷偷加载资源 兼容性差
        
        import(/*webpackChunkName: 'test', webpackPrefetch: true*/'./test').then(({mul}) => {
            console.log(mul(4, 5))
        })
  }
    ```

  * PWA
  
    ```javascript
    PWA: 渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
    
    module.exports = {
        plugins: [
            new WorkboxWebpackPlugin.GenerateSW({
                /*
                	1. 帮助serviceworker快速启动
                	2. 删除旧的serviceworker
                	
                	生成一个serviceworker配置文件
                */
                clientsClaim: true,
                skipWaiting: true
            })
        ]
    }
    
    index.js
    // 注册serviceWorker
  // 处理兼容性问题
    // 2. sw代码不许运行在服务器上
  // --> nodejs
    // --> npm i serve -g
    //     serve -s build 启动服务器，将build目录下所有资源暴露出去
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => {
            	console.log('sw注册成功了')
            })
            .catch(() => {
            	console.log('sw注册失败了')
            })
        })
    }
    
    ```
    
    
    





