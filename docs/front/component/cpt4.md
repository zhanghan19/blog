# 手势

## 手势的基本知识
<ME-img url="/images/shoushi.png"/>

## 实现鼠标操作
创建gesture.js

```js
let element = document.documentElement;

element.addEventListener("mousedown", event => {
  start(event)
  let mousemove = event => {
    move(event)
  }

  let mouseup = event => {
    end(event)
    element.removeEventListener("mousemove", mousemove);
    element.removeEventListener("mouseup", mouseup)
  }

  element.addEventListener("mousemove", mousemove);
  element.addEventListener("mouseup", mouseup);
})

element.addEventListener("touchstart", event => {
  for (let touch of event.changedTouches) {
    start(touch)
  }
})

element.addEventListener("touchmove", event => {
  for (let touch of event.changedTouches) {
    move(touch)
  }
})

element.addEventListener("touchend", event => {
  for (let touch of event.changedTouches) {
    end(touch)
  }
})

element.addEventListener("touchcancel", event => {
  for (let touch of event.changedTouches) {
    cancel(touch)
  }
})

let start = (point) => {
  console.log("start", point.clientX, point.clientY)
}

let move = (point) => {
  console.log("move", point.clientX, point.clientY)
}

let end = (point) => {
  console.log("end", point.clientX, point.clientY)
}

let cancel = (point) => {
  console.log("stcancelart", point.clientX, point.clientY)
}

```

## 实现手势的逻辑

```js
let element = document.documentElement;

element.addEventListener("mousedown", event => {
  start(event)
  let mousemove = event => {
    move(event)
  }

  let mouseup = event => {
    end(event)
    element.removeEventListener("mousemove", mousemove);
    element.removeEventListener("mouseup", mouseup)
  }

  element.addEventListener("mousemove", mousemove);
  element.addEventListener("mouseup", mouseup);
})

element.addEventListener("touchstart", event => {
  for (let touch of event.changedTouches) {
    start(touch)
  }
})

element.addEventListener("touchmove", event => {
  for (let touch of event.changedTouches) {
    move(touch)
  }
})

element.addEventListener("touchend", event => {
  for (let touch of event.changedTouches) {
    end(touch)
  }
})

element.addEventListener("touchcancel", event => {
  for (let touch of event.changedTouches) {
    cancel(touch)
  }
})

let handler;
let startX, startY;
let isPan = false, isTap = true, isPress = false;


let start = (point) => {
  startX = point.clientX, startY = point.clientY;

  isPan = false;
  isTap = true;
  isPress = false;
  handler = setTimeout(() => {
    isPan = false;
    isTap = false;
    isPress = true;
    handler = null
    console.log("press")
  }, 500)

}

let move = (point) => {
  let dx = point.clientX - startX, dy = point.clientY;
  if(!isPan && dx ** 2 + dy ** 2 > 100) {
    isPan = true;
    isTap = false;
    isPress = false;
    console.log("panstart")
    clearTimeout(handler)
  }

  if(isPan) {
    console.log(dx,dy)
    console.log("pan")
  }
}

let end = (point) => {
  if(isTap) {
    console.log("tap")
    clearTimeout(handler)
  }
  if(isPan) {
    console.log("panend")
  }
  if(isPress){
    console.log("pressend")
  }
  // console.log("end", point.clientX, point.clientY)
}

let cancel = (point) => {
  clearTimeout(handler)
  // console.log("stcancelart", point.clientX, point.clientY)
}
```

## 整理移动端手势

```js
let contexts = new Map();

element.addEventListener("touchstart", event => {
  for (let touch of event.changedTouches) {
    let context = Object.create(null);
    contexts.set(touch.identifier, context)
    start(touch, context)
  }
})

element.addEventListener("touchmove", event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier)
    move(touch, context)
  }
})

element.addEventListener("touchend", event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier)
    end(touch, context)
    contexts.delete(touch.identifier);
  }
})

element.addEventListener("touchcancel", event => {
  for (let touch of event.changedTouches) {
    let context = contexts.get(touch.identifier)
    cancel(touch, context)
    contexts.delete(touch.identifier);
  }
})


let start = (point, context) => {
  context.startX = point.clientX, context.startY = point.clientY;

  context.isPan = false;
  context.isTap = true;
  context.isPress = false;
  handler = setTimeout(() => {
    context.isPan = false;
    context.isTap = false;
    context.isPress = true;
    context.handler = null
    console.log("press")
  }, 500)

}

let move = (point, context) => {
  context.dx = point.clientX - context.startX, context.dy = point.clientY - context.startX;
  if(!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
    context.isPan = true;
    context.isTap = false;
    context.isPress = false;
    console.log("panstart")
    clearTimeout(context.handler)
  }

  if(context.isPan) {
    console.log(context.dx,context.dy)
    console.log("pan")
  }
}

let end = (point, context) => {
  if(context.isTap) {
    console.log("tap")
    clearTimeout(context.handler)
  }
  if(context.isPan) {
    console.log("panend")
  }
  if(context.isPress){
    console.log("pressend")
  }
  // console.log("end", point.clientX, point.clientY)
}

let cancel = (point, context) => {
  clearTimeout(context.handler)
  // console.log("stcancelart", point.clientX, point.clientY)
}
```


## 处理鼠标事件

```js
let element = document.documentElement;

// 控制多建一起按下出现事件监听会被触发多次，导致报错
let isListeningMouse = false;

element.addEventListener("mousedown", event => {
  let context = Object.create(null);
  contexts.set("mouse" + (1 << event.button), context);
  console.log("start", (1 << event.button))
  start(event, context)
  let mousemove = event => {
    let button = 1;

    while(button <= event.buttons) {
      if(button & event.buttons){
        // order of buttons & button property is not same
        let key;
        if(button === 2)
          key = 4;
        else if (button === 4)
          key = 2
        else
          key = button
        
        let context = contexts.get("mouse" + key);
        console.log("move", (key))
        move(event, context);
      }
      
      button = button << 1;
    }
  }

  let mouseup = event => {
    let context = contexts.get("mouse" + (1 << event.button));
    console.log("up", (1 << event.button))
    end(event, context)
    contexts.delete("mouse" + (1 << event.button))

    if(event.buttons === 0){
      element.removeEventListener("mousemove", mousemove);
      element.removeEventListener("mouseup", mouseup);
      isListeningMouse = false;
    }
    
  }

  if(!isListeningMouse) {
    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
    isListeningMouse = true;
  }

})

let contexts = new Map();


let start = (point, context) => {
  context.startX = point.clientX, context.startY = point.clientY;
  context.isPan = false;
  context.isTap = true;
  context.isPress = false;
  handler = setTimeout(() => {
    context.isPan = false;
    context.isTap = false;
    context.isPress = true;
    context.handler = null
    console.log("press")
  }, 500)

}

let move = (point, context) => {
  context.dx = point.clientX - context.startX, context.dy = point.clientY - context.startX;
  if(!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
    context.isPan = true;
    context.isTap = false;
    context.isPress = false;
    console.log("panstart")
    clearTimeout(context.handler)
  }

  if(context.isPan) {
    console.log(context.dx,context.dy)
    console.log("pan")
  }
}

let end = (point, context) => {
  if(context.isTap) {
    console.log("tap")
    clearTimeout(context.handler)
  }
  if(context.isPan) {
    console.log("panend")
  }
  if(context.isPress){
    console.log("pressend")
  }
  // console.log("end", point.clientX, point.clientY)
}

let cancel = (point, context) => {
  clearTimeout(context.handler)
  // console.log("stcancelart", point.clientX, point.clientY)
}
```
## 派发事件

```js
function dispatch (type, properties) {
  let event = new Event(type)
  for(let name in properties) {
    event[name] = properties[name]
  }
  element.dispatchEvent(event);
}
```

## 实现一个flick事件

对于速度的判读我们是取数个点然后求平均，这里我们采用存储一定时间之内的点

```js
let start = (point, context) => {
  context.startX = point.clientX, context.startY = point.clientY;
  
  // 在start的时候我们要在一个数组中保存开始的时间，和位置
  context.points = [{
    t: Date.now(),
    x: point.clientX,
    y: point.clientY
  }]
  context.isPan = false;
  context.isTap = true;
  context.isPress = false;
  handler = setTimeout(() => {
    context.isPan = false;
    context.isTap = false;
    context.isPress = true;
    context.handler = null
    console.log("press")
  }, 500)

}

let move = (point, context) => {
  context.dx = point.clientX - context.startX, context.dy = point.clientY - context.startX;
  if (!context.isPan && context.dx ** 2 + context.dy ** 2 > 100) {
    context.isPan = true;
    context.isTap = false;
    context.isPress = false;
    console.log("panstart")
    clearTimeout(context.handler)
  }

  if (context.isPan) {
    console.log(context.dx, context.dy)
    console.log("pan")
  }

  // 过滤半秒内的速度
  context.points = context.points.filter(point => Date.now() - point.t < 500)
  // move 的时候添加点
  context.points.push({
    t: Date.now(),
    x: point.clientX,
    y: point.clientY
  })

}

let end = (point, context) => {
  if (context.isTap) {
    console.log("tap");
    dispatch("tap", context)
    clearTimeout(context.handler)
  }
  if (context.isPan) {
    dispatch("tap", context)
    console.log("panend")
  }
  if (context.isPress) {
    dispatch("tap", context)
    console.log("pressend")
  }

  // 计算速度
  context.points = context.points.filter(point => Date.now() - point.t < 500)
  let s, t, v;
  if (!context.points.length) {
    v = 0
  } else {
    s = Math.sqrt((point.clientX - context.points[0].x) ** 2 +
     (point.clientY - context.points[0].y) ** 2)
    t = (Date.now() - context.points[0].t);

    v = s / t;
  }

  if(v > 1.5) {
    console.log("flick")
    context.isFlick = true;
  } else {
    context.isFlick = false;
  }
  // console.log("end", point.clientX, point.clientY)
}

let cancel = (point, context) => {
  clearTimeout(context.handler)
  // console.log("stcancelart", point.clientX, point.clientY)
}
```

## 封装

如果把他做成解耦处理的话我们可以分为:
<mermaid>
graph LR
  id1("listen")
  id2("recognize")
  id3("dispatch")
  id1 --> id2
  id2 --> id3
</mermaid>

