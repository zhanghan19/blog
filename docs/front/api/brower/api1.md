# DOM API

<img :src="$withBase('/images/node.png')" alt="css标准">

## 导航类操作

- node
  - parentNode
  - childNodes
  - firstChild
  - lastChild
  - nextSibling
  - previousSibling
- Element
	- parentElement
	- children
	- firstElememtChild
	- lastElementChild
	- nextElementSibling
	- previousElementSibling

## 修改操作

- appendChild
- inserBefore
- removeChild
- replaceChild

## 高级操作

- compareDocumentPosition是一个用于比较两个节点中关系的函数
- contains检查一个节点是否包含另一个节点的函数
- isEqualNode检查两个节点是否完全相同
- isSameNode检查两个节点是否是同一个节点，实际上在Javascript中可以用“===”。
- cloneNode复制一个节点，如果传入参数true，则会连同子元素做深拷贝。

## offset
- offsetWidth 和 offsetHeight
::: tip 描述
1. 只读属性。
2. 获取元素大小（正是宽高 = margin + padding + width/height）
3. element.style.widht = "widht" ( 设置宽 )
:::

- offsetLeft 和 offsetTop
::: tip 描述
1. 用来得到对象的位置。
2. 获取到最近的带有定位父元素的左侧/顶部的距离。如果所有父元素都没有定位则以body为准。

区别：
offsetLeft 以body左上角为准
style.left 以margin左上角为准
:::

- offsetParent

::: tip 描述
1. 返回该对象**带有定位**的父级

parentNode 找亲爹

offsetParent 找亲爹活干爹
:::