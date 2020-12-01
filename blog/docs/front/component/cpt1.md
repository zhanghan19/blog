# 对象与组件

| 对象       | 组件               |
| ---------- | ------------------ |
| Properties | Properites（属性） |
| Methods    | Methods            |
| Inherit    | Inherit            |
|            | Attribute(特性)    |
|            | config & State     |
|            | Event              |
|            | Lifecycle          |
|            | Children           |

## component

![](/images/component/cpt01.png)


## Attribute

• Attribute vs Property

![](/images/component/cpt02.png)

```js
// Attribute:
<my-component attribute="v" />
myComponent.getAttribute("a")
myComponent.setAttribute("a","value");


// Property:
myComponent.a ="value";


<div class="cls1 cls2"></div>
<script>
var div = document.getElementByTagName("div");
div.className // cls1 cls2
</script>

<div class="cls1 cls2" style="color:blue" ></div>
<script>
var div = document.getElementByTagName('div');
div.style // 对象
</script>

<a href="//m.taobao.com" ></div>
<script>
var a = document.getElementByTagName('a');
a.href // 'http://m.taobao.com'，这个 URL 是 resolve 过的结果
a.getAttribute('href') // "//m.taobao.com"，跟 HTML 代码中完全一致
</script>


<input value = "cute" />
<script>
var input = document.getElementByTagName('input'); // 若 property 没有设置，
则结果是 attribute
input.value // cute
input.getAttribute('value'); // cute
input.value = 'hello'; // 若 value 属性已经设置，则 attribute 不变，property 变化，
元素上实际的效果是 property 优先
input.value // hello
input.getAttribute('value'); // cute
</script>
```

## 如何设计组件状态
![](/images/component/cpt03.png)

## Lifecycle

![](/images/component/cpt04.png)

## Children

- Content 型 Children 与 Template 型 Children

```js
<my-button><img src=“{{icon}}”/>{{title}}</my-button>
<my-list>
<li><img src=“{{icon}}”/>{{title}}</li>
</my-list>
```

## 为组件添加JSX语法

- 初始化项目

```shell
npm init 
```
- 安装依赖

```shell
npm install --save-dev webpack babel-loader @babel/core @babel/preset-env
```

- 添加webpack.config.js 和 main.js
webpack.config.js 
```js
module.exports = {
	entry: "./main.js"
}
```
main.js
```js
let add = (x, y) => {
  return x + y
}
```

运行webpack

- 为了运行jsx语法安装 @babel/plugin-transform-react-jsx

```shell
npm install --save-dev @babel/plugin-transform-react-jsx
```

- 修改main.js
```js
let add = (x, y) => {
  return x + y
}

let a = <div/>
```
- 修改webpack.config.js

```js
module.exports = {
  entry: "./main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx",{pragma:"createElement"}]]
          }
        }
      }
    ]
  },
  mode: "development"
}
```
## JSX的基本使用方法

在main.js中输入

```js
let a = <div id="s">
   <span>1</span>
   <span>2</span>
   <span>3</span>
</div>
```
上面代码被webpack打包编译之后会生成如下代码

```js
var a = createElement("div", {
  id: "s"
}, createElement("span", null, "1"), 
   createElement("span", null, "2"), 
   createElement("span", null, "3"));
```
所以我们只需要在createElement函数中编写逻辑即可

::: warning 注意
createElement 函数名是在配置@babel/plugin-transform-react-jsx插件时配置pragma:"createElement"
::: 

::: details createElement

```js
function createElement(type, attributes, ...children) {
  let element = element = document.createElement(type);
  for(let name in attributes) {
    element.setAttribute(name, attributes[name])
  }

  for(let child of children) {
    if(typeof child === 'string') {
      child = document.createTextNode(child)
    }
    element.appendChild(child)
  }
  return element;
}

let a = <div id="s">
   <span>1</span>
   <span>2</span>
   <span>3</span>
</div>

document.body.appendChild(a)

```
::: 

::: details createElement 自定义组件
```js
function createElement(type, attributes, ...children) {
  let element = null;
  if (typeof type === "string") {
    element = new ElementWrapper(type)
  } else {
    element = new type;
  }

  for (let name in attributes) {
    element.setAttribute(name, attributes[name])
  }

  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child)
    }
    child.mountTo(element)
  }
  return element;
}

class Component {
  constructor() {
    // this.root = this.render();
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    this.root.appendChild(child)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super()
    this.root = document.createElement(type)
  }
 
}

class TextWrapper extends Component {
  constructor(content) {
    super()
    this.root = document.createTextNode(content)
  }
}

class Div extends Component {
  constructor() {
    super()
    this.root = document.createElement('div');
  }
}

let a = <Div id="s">
  <span>1</span>
  <span>2</span>
  <span>3</span>
</Div>

a.mountTo(document.body)
```
:::