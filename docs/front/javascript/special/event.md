# 自定义事件

- 创建event的方法

```js
let event = new CustomEvent(type, {})
let event = new Event(type)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button id="name">获取姓名</button>
  <script>
  let element = document.documentElement;
	
  function dispatch (type, properties) {
    let event = new Event(type)
    for(let name in properties) {
      event[name] = properties[name]
    }
    element.dispatchEvent(event);
  }

  document.documentElement.addEventListener("getName", (event) => {
      console.log("tap event trigger!")
  })

  const name = document.querySelector('#name');
  name.addEventListener('click', () => {
    console.log(12)
    dispatch("getName", {name: "zhanghan"})
  })
  </script>
</body>
</html>
```