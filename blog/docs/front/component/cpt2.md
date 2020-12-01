# 轮播组件

- 初始化项目

```shell
npm init
```
- 安装依赖

```shell
"@babel/core": "^7.11.6",
"@babel/plugin-transform-react-jsx": "^7.10.4",
"@babel/preset-env": "^7.11.5",
"babel-loader": "^8.1.0",
"css-loader": "^4.3.0",
"file-loader": "^6.1.0",
"html-loader": "^1.3.0",
"html-webpack-plugin": "^4.4.1",
"style-loader": "^1.2.1",
"url-loader": "^4.1.0",
"webpack": "^4.44.2",
"webpack-cli": "^3.3.12",
"webpack-dev-server": "^3.11.0"
```

::: warning
"webpack": "^4.44.2",
"webpack-cli": "^3.3.12",
"webpack-dev-server": "^3.11.0"

webpack 版本为5以上 webpack-dev-server启动不了
:::

- 创建webpack.config.js

```js
const { resolve } = require('path');
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
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true
  }
}
```

- 创建framework.js

```js


export function createElement(type, attributes, ...children) {
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

export class Component {
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
```

- 创建main.js

```js
import{ Component, createElement} from "./framework.js"

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
   
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add("carousel")
    for(let record of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage =  `url(${record})`;
      this.root.appendChild(child)
    }

    let currentIndex = 0;
    setInterval(() => {
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length

      let current = children[currentIndex];
      let next = children[nextIndex];

      next.style.transition = "none";
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`

      setTimeout(() => {
        next.style.transition = ""
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        next.style.transform =  `translateX(${- nextIndex * 100}%)`
        currentIndex = nextIndex
      },16)
   
    },1000)


    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]

let a = <Carousel src={d} />
a.mountTo(document.body)

```

运行npx webpack-dev-server

- 想实现1-n之间循环，对 n 进行取余就可以了

```js
// current 在 0-3 之间循环
let current = 0;
setInterval(() => {
  ++current;
  current = current % 4;
  console.log(current)
},1000)
```

- 实现手动轮播 修改main.js

```js
import{ Component, createElement} from "./framework.js"

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
   
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add("carousel")
    for(let record of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage =  `url(${record})`;
      this.root.appendChild(child)
    }
    let position = 0
    this.root.addEventListener('mousedown', event => {
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        let x = event.clientX - startX;
        let current = position - ((x - x % 500) / 500);

        for(let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`
        }

      }

      let up = event => {
        let x = event.clientX - startX;
        position = position - Math.round(x / 500)
        for(let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length
          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]

let a = <Carousel src={d} />
a.mountTo(document.body)
```