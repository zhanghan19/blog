# 初步建立动画和时间线

## js处理帧的常见方法

```js
// 方法一 // 不是很安全不管你有没有执行完都会放进interval队列里面会发生积压
setInterval(() => {
  
}, 16);

// 方法二
let tick = () => {
  setTimeout(tick, 16);
}

// 方法三
let tick = () => {
  // requestAnimationFrame 的含义：是我申请浏览器执行下一帧的时候我们来执行这个代码
  let handler = requestAnimationFrame(tick); 
  
  // cancelAnimationFrame 停止动画
  cancelAnimationFrame(handler)
}
```
- 初始化项目
```shell
mkdir animation-demo

cd animation-demo

npm init -y

```
- 安装依赖

```json
 "devDependencies": {
    "@babel/core": "^7.12.3",
    "@babel/plugin-transform-react-jsx": "^7.12.5",
    "@babel/preset-env": "^7.12.1",
    "babel-loader": "^8.1.0",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.5.1"
  }
```

- 添加配置文件 webpack.config.js

```js
const { resolve } = require('path');
module.exports = {
  entry: "./animation-demo.js",
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


## Timeline
- 新建animation.js
```js
//animation.js

const TICK = Symbol('tick');
const TICK_HANDLER = Symbol("tick-handler");
export class Timeline {
	constructor() {
		
	}
	start() {
		this[TICK] = () => {
		  console.lgo('tick')
		  this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
		}
		this[TICK]()
	}
	
	// set rate() {}
	// get rate() {}
	
	pause() {}
	resume() {}
	
	reset() {}
}
```

- 测试requestAnimationFrame 是否正常运行

- 新建main.js
```js
import {Timeline} from "./animation.js"

let tl = new Timeline();
tl.start()
```

- 给tick添加animation

```js
export class Animation {
  constructor(object, property, startValue, endValue, duration,delay, timingFunction, template){
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction || (v => v);
    this.delay = delay;
    this.template = template || (v => `translateX(${v}px)`) ;
  }
  receive(time) { // 为什么要传time 因为time是运行过程中从开始到结束的时间点
    // console.log(time)
    let range = this.endValue - this.startValue;
    let progress = this.timingFunction(time / this.duration);
    this.object[this.property] = this.template(this.startValue + range * progress)
  }
}
```

- 完善Timeline

```js
const TICK = Symbol('tick');
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animitions")
const START_TIME = Symbol("start_time")
const PAUSE_START = Symbol("pause-start")
const PAUSE_TIME = Symbol("pause-time")
export class Timeline {
  constructor() {
    this.state = "Inited"
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();  // 保存添加的时间为了动态添加ainimation
  }
  start() {
    if(this.state !== "Inited")
      return
    this.state = "started"
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Date.now();
      for(let animation of this[ANIMATIONS]) {
        let t;
        if(this[START_TIME].get(animation) < startTime)
          t = now - startTime - this[PAUSE_TIME] - animation.delay;
        else
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
        
        if(animation.duration < t){
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }

        if(t > 0){
          animation.receive(t)
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }

  pause() {
    if(this.state !== "started")
      return
    this.state = "paused"
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  resume() {
    if(this.state !== "paused")
      return
    this.state = "started"
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]();
  }
  reset() {
    this.pause()
    this.state = "Inited"
    // let startTime = Date.now();
    this[TICK_HANDLER] = null;
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[PAUSE_TIME] = 0;
    this[PAUSE_START] = 0;
  }
  add(animation, startIime) {
    if(arguments.length < 2) {
      startIime = Date.now()
    }
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startIime)
  }
}
```

## 整合animation.js

```js
const TICK = Symbol('tick');
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animitions")
const START_TIME = Symbol("start_time")
const PAUSE_START = Symbol("pause-start")
const PAUSE_TIME = Symbol("pause-time")
export class Timeline {
  constructor() {
    this.state = "Inited"
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();  // 保存添加的时间为了动态添加ainimation
  }
  start() {
    if(this.state !== "Inited")
      return
    this.state = "started"
    let startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Date.now();
      for(let animation of this[ANIMATIONS]) {
        let t;
        if(this[START_TIME].get(animation) < startTime)
          t = now - startTime - this[PAUSE_TIME] - animation.delay;
        else
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
        
        if(animation.duration < t){
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }

        if(t > 0){
          animation.receive(t)
        }
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }

  pause() {
    if(this.state !== "started")
      return
    this.state = "paused"
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  resume() {
    if(this.state !== "paused")
      return
    this.state = "started"
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]();
  }
  reset() {
    this.pause()
    this.state = "Inited"
    // let startTime = Date.now();
    this[TICK_HANDLER] = null;
    this[ANIMATIONS] = new Set();
    this[START_TIME] = new Map();
    this[PAUSE_TIME] = 0;
    this[PAUSE_START] = 0;
  }
  add(animation, startIime) {
    if(arguments.length < 2) {
      startIime = Date.now()
    }
    this[ANIMATIONS].add(animation);
    this[START_TIME].set(animation, startIime)
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration,delay, timingFunction, template){
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.timingFunction = timingFunction || (v => v);
    this.delay = delay;
    this.template = template || (v => `translateX(${v}px)`) ;
  }
  receive(time) { // 为什么要传time 因为time是运行过程中从开始到结束的时间点
    // console.log(time)
    let range = this.endValue - this.startValue;
    let progress = this.timingFunction(time / this.duration);
    this.object[this.property] = this.template(this.startValue + range * progress)
  }
}
```

- 创建timingFunction文件为ease.js

```js
export function cubicBezier(p1x, p1y, p2x, p2y) {
  const ZERO_LIMIT = 1e-6;
  // Calculate the polynomial coefficients,
  // implicit first and last control points are (0,0) and (1,1).
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;

  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;

  function sampleCurveDerivativeX(t) {
    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function sampleCurveX(t) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t) {
    return ((ay * t + by) * t + cy) * t;
  }

  // Given an x value, find a parametric value it came from.
  function solveCurveX(x) {
    var t2 = x;
    var derivative;
    var x2;

    // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
    // First try a few iterations of Newton's method -- normally very fast.
    // http://en.wikipedia.org/wiki/Newton's_method
    for (let i = 0; i < 8; i++) {
      // f(t)-x=0
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      derivative = sampleCurveDerivativeX(t2);
      // == 0, failure
      /* istanbul ignore if */
      if (Math.abs(derivative) < ZERO_LIMIT) {
        break;
      }
      t2 -= x2 / derivative;
    }

    // Fall back to the bisection method for reliability.
    // bisection
    // http://en.wikipedia.org/wiki/Bisection_method
    var t1 = 1;
    /* istanbul ignore next */
    var t0 = 0;

    /* istanbul ignore next */
    t2 = x;
    /* istanbul ignore next */
    while (t1 > t0) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < ZERO_LIMIT) {
        return t2;
      }
      if (x2 > 0) {
        t1 = t2;
      } else {
        t0 = t2;
      }
      t2 = (t1 + t0) / 2;
    }

    // Failure
    return t2;
  }

  function solve(x) {
    return sampleCurveY(solveCurveX(x));
  }

  return solve;
}


export let linear = cubicBezier(0,0,1,1)
export let ease = cubicBezier(.25,.1,.25,1)
export let easeIn = cubicBezier(.42,0,1,1)
export let easeOut = cubicBezier(0,0,.58,1)
export let easeInOut = cubicBezier(.42,0,.58,1)
```

- 创建animation-demo.js文件

```js
import {Timeline, Animation} from './animation.js'
import {ease, linear, easeIn, easeOut, easeInOut} from "./ease.js"
let tl = new Timeline()
tl.start()
tl.add(new Animation(document.querySelector("#el").style, "transform", 0 , 1000, 3000,0, ease, v => `translateX(${v}px)`))
tl.add(new Animation(document.querySelector("#el-1").style, "transform", 0 , 1000, 3000,0, linear, v => `translateX(${v}px)`))
tl.add(new Animation(document.querySelector("#el-2").style, "transform", 0 , 1000, 3000,0, easeIn, v => `translateX(${v}px)`))
tl.add(new Animation(document.querySelector("#el-3").style, "transform", 0 , 1000, 3000,0, easeOut, v => `translateX(${v}px)`))
tl.add(new Animation(document.querySelector("#el-4").style, "transform", 0 , 1000, 3000,0, easeInOut, v => `translateX(${v}px)`))

document.querySelector('#pause-btn').addEventListener('click', () => tl.pause())
document.querySelector('#resume-btn').addEventListener('click', () => tl.resume())
document.querySelector('#reset-btn').addEventListener('click', () => tl.reset())


```
- 创建animation.html文件

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div id="el" style="width: 100px;height: 100px;background-color: lightblue;"></div>
  <div id="el-1" style="width: 100px;height: 100px;background-color: lightblue;"></div>
  <div id="el-2" style="width: 100px;height: 100px;background-color: lightblue;"></div>
  <div id="el-3" style="width: 100px;height: 100px;background-color: lightblue;"></div>
  <div id="el-4" style="width: 100px;height: 100px;background-color: lightblue;"></div>
  <button id="pause-btn">pause</button>
  <button id="resume-btn">resume</button>
  <button id="reset-btn">reset</button>
  <script type="module" src="./animation-demo.js"></script>
</body>

</html>
```

- 运行webpack.config.js

