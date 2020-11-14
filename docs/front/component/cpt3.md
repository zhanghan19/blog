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