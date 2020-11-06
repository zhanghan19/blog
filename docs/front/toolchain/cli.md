# 初始化与构建

[yeoman](https://yeoman.io/)

## 使用

- 安装

```shell
npm install -g yo
```

- 创建文件夹并进入

```shell
mkdir yeoman-test

cd yeoman-test
```

- 初始化package.json

```shell
npm init
```
::: warning 注意
package.json 中name属性必须以 generator-(name) 开头
:::

- 安装 <font color="#3eaf7c">yeoman-generator</font>

```shell
npm install yeoman-generator --save
```

- 创建文件结构如下

```
├───package.json
└───generators/
    ├───app/
        └───index.js
```

- 在genertators.app/index.js中添加如下代码

```js
module.exports = class extends Generator {
	// The name `constructor` is important here
	constructor(args, opts) {
	// Calling the super constructor is important so our generator is correctly set up
	super(args, opts);
	}
	
	method1() {
	  this.log('method 1 just ran');
	}

	method2() {
	  this.log('method 2 just ran');
	}
};
```

- 将模块连接到对应的项目中去，方便对模块进行调试和测试。

```shell
npm link
```

- 执行

```shell
yo-(name)
```
至此yeoman运行成功

- 这是用yeoman搭建vue-cli 的小案例
[点击查看](https://github.com/zhanghan19/Frontend-02-Template/tree/master/week16)