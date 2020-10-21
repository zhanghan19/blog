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
> var range = new Range()
>
> range.setStart(element, 9)
>
> range.setEnd(element, 4)
>
> var range = document.getSetSelection().getRangeAt(0)
>
> range.setStartBefore
>
> range.setEndBefore
>
> range.setStartAfter
>
> range.setEndAfter
>
> range.selectNode
>
> range.selectNodeContents
>
>
> var fragement = range.extractContents()
>
> range.isnertNode(document.createTextNode("aaa"))

```javascript
// 方法二
let element = document.getElementById("oo");
	
function reverseChildren(element) {
	let range = new Range();
	range.selectNodeContents(element);
	let fragment = range.extractContents();
	let len = fragment.childNodes.length;
	while (len-- > 0) {
		fragment.appendChild(fragment.childNodes[len])
	}
	element.appendChild(fragment);
}
reverseChildren(element)


```