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