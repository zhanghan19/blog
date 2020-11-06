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
