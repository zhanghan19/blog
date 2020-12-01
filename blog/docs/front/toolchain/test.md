# 单元测试工具

## [MOCHA](https://mochajs.org/)

- 安装

  ```shell
  npm install --global mocha
  
  //or as a development dependency for your project:
  
  npm install --save-dev mocha
  ```

- 初始化项目并安装mocha

  ```shell
  npm init
  npm install --save-dev mocha
  ```

- 创建add.js

  ```js
  function add(a, b) {
    return a + b
  }
  
  module.exports = add;
  ```

- 创建测试文件test/test.js

  ```js
  var assert = require('assert');  
  
  var add = require('../add.js')  // mocha 一开始就是为node编写 所以要用require引入
  
  it('1+2 should be 3', function() {
    assert.equal(add(1,2), 3);
  });
  
  // 分组机制
  describe('add function testing', function() {
    it('1+2 should be 3', function() {
      assert.equal(add(1,2), 3);
    });
    it('2+2 should be 4', function() {
      assert.equal(add(2,2), 4);
    });
  });
  ```

- 运行mocha命令

## 解决必须使用require引入问题

- 安装

  ```shell
  npm install --save-dev @babel/core @babel/register
  ```

- 新建.babelrc文件并安装依赖

  ```js
  {
    "presets": ["@babel/preset-env"]
  }
  npm install --save-dev @babel/preset-env
  ```

- 修改add.js 和test/test.js

  ```js
  // add.js
  export function add(a, b) {
    return a + b
  }
  
  // test/test.js
  var assert = require('assert');
  
  import {add} from "../add.js"
  it('1+2 should be 3', function() {
    assert.equal(add(1,2), 3);
  });
  
  // 分组机制
  describe('add function testing', function() {
    it('1+2 should be 3', function() {
      assert.equal(add(1,2), 3);
    });
    it('2+2 should be 4', function() {
      assert.equal(add(2,2), 4);
    });
  });
  ```

  

- 运行本地mocha

  ```shell
  ./node_modules/.bin/mocha --require @babel/register
  
  // 同样可以使用package.json
  "script": {
  	"test": "mocha --require @babel/register"
  }
  ```

## code coverage

使用工具nyc [istanbul.js.org](istanbul.js.org)

- 安装

  ```shell
  npm install --save-dev nyc
  ```

- 使用

  ```shell
  ./node_modules/.bin/nyc ./node_modules/.bin/mocha --require @babel/register
  
  // 同样可以使用package.json
  "scripts": {
      "test": "mocha --require @babel/register",
      "nyc": "nyc mocha --require @babel/register"
  },
  ```

配合babel使用

- 安装插件并配置.babelrc

  ```shell
  npm install --save-dev babel-plugin-istanbul
  
  // .babelrc
  {
    "presets": ["@babel/preset-env"],
    "plugins": ["istanbul"]
  }
  ```

- 新建.nycrc 并安装依赖

  ```js
  {
    "extends": "@istanbuljs/nyc-config-babel"
  }
  npm install --save-dev @istanbuljs/nyc-config-babel
  ```

- 运行

  ```shell
  ./node_modules/.bin/nyc ./node_modules/.bin/mocha --require @babel/register
  ```

- 添加scripts

  ```js
  "scripts": {
      "test": "mocha --require @babel/register",
      "coverage": "nyc mocha"
   },
  ```

  

## 为toy-Browser中的parseHtml写单元测试

```js
// 问题一  emit(currentToken);  // 缺少
function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;  // 
    emit(currentToken);  // 缺少
    return data;
  } else if (c == "EOF") {

  } else {

  }
}
// 问题二     emit({type: 'text',content: s}) 缺少
function tagOpen(s){
  if(s === '/'){
    return endTagOpen;
  }else if(s.match(tagNameReg)){
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(s);
  }else{
    emit({type: 'text',content: s})  // 缺少
    return data;
  }
}
```



## 所有工具与generator的集成





## See Also

[jest](https://jestjs.io/)

