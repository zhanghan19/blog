# 持续集成

## Git Hooks基本用法

准备
```shell
# 创建文件夹
mkdir git-demo
# 进入文件夹
cd git-demo
# 创建reamd文件
touch REAMDE.md
# 创建仓库
git init
```
在 .git 文件中找到hooks文件夹并兴建pre-commit文件

查看pre-commit权限，如果没有执行权限则执行：

```shell
chmod +x ./pre-commit
```

在pre-commit写入：
```js
#!/usr/bin/env node
console.log("hello, hooks")
```
执行git commit -m 'add readme'

## ESLint基本用法
[官网点击查看](https://eslint.org/docs/user-guide/getting-started)

## ESLint API及其高级用法

[官网点击查看](https://eslint.org/docs/developer-guide/nodejs-api#eslint-class)
```js
// pre-commit
let process = require("process");
let child_process = require("child_process");

const { ESLint } = require("eslint");

function exex(name) {
	return new Promise(function(resolve) {
		child_process.exec(name, resolve)
	})
}

(async function main() {
  // 1. Create an instance.
  const eslint = new ESLint({fix:false});

  // 2. Lint files.
  await exec("git stash push -K")
  const results = await eslint.lintFiles(["lib/**/*.js"]);
  await exec("git stash pop")
  // 3. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 4. Output it.
  console.log(resultText);
  
  for(ler result of results) {
	  if(result.errorCount) {
		process.exitCode = 1;
	  }
  }
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```
## 使用无头浏览器检查DOM

[headeless官网](https://developers.google.com/web/updates/2017/04/headless-chrome)

[puppeteer](https://developers.google.com/web/tools/puppeteer/get-started)

- 示例

```shell
mkdir puppeteer

cd puppeteer

npm init -y

npm install --save-dev puppeteer

```
新建文件main.js

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/');
  const a = await page.$('a');
  console.log(await a)
  await browser.close();
})();
```

运行 node main.js

