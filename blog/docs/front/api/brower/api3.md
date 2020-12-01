# Range API

- 先思考一个问题
	- 把一个元素所有的子元素逆序
	- 12345 ==> 54321
```html
<div id="oo">
	<span>1</span>
	<a>2</a>
	<p>3</p>
	<div>4</div>
</div>
```

```javascript
// 方法一
let element = document.getElementById('oo');

function reverseChildren(element) {
	let children = Array.prototype.slice.call(element.childNodes);
	
	for(let child of children) {
		element.removeChild(child)
	}
	// element.innerHTML = ''
	
	children.reverse();
	
	for(let child of children) {
		element.appendChild(child)
	}
}

reverseChildren(element);
```
```javascript
// 方法二
let element = document.getElementById('oo');

function reverseChildren(element) {
	var  l = element.childNodes.length;
	while(l-- > 0) {
		element.appendChild(element.childNodes[l])
	}
}

reverseChildren(element);
```

::: tip range 使用方法

 var range = new Range()

 range.setStart(element, 9)

 range.setEnd(element, 4)

 var range = document.getSetSelection().getRangeAt(0)

 range.setStartBefore

 range.setEndBefore

 range.setStartAfter

 range.setEndAfter

 range.selectNode  // 选中一个元素

 range.selectNodeContents   // 选择一个元素的所有内容 


 var fragement = range.extractContents()  // 取出range选中范围

 range.isnertNode(document.createTextNode("aaa"))
:::
[See also](https://developer.mozilla.org/en-US/docs/Web/API/Range)

```javascript
// 方法三
const element = document.querySelector('#oo');
			
	function reverseChildren(element) {
		// 1. 实例化 rang
		const range = new Range()
		
		// 2. 设置rang范围
		range.selectNodeContents(element)
		
		// 3. 通过rang获取fragment来操作rang范围内的节点
		const fragment = range.extractContents()
		
		// 4. 反转子节点
		let len = fragment.childNodes.length;
		
		while(len-- > 0) {
			fragment.appendChild(fragment.childNodes[len])
		}
		
		// 添加到element中
		element.appendChild(fragment)
	}
	
	reverseChildren(element)


```