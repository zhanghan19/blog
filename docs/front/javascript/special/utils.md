# 工具函数

## 解析查询字符串
```js
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) {
		return decodeURI(r[2])
	};
	return null; //返回参数值
}
```
## 深拷贝

```js	
function deepClone(obj, hash = new WeakMap()) {
	if (obj == null) return obj;
	
	if (obj instanceof Date) return new Date(obj);
	
	if (obj instanceof RegExp) return new RegExp(obj);
	
	if (typeof obj !== "object") return obj;
	
	// 如果拷贝的对象是存在，直接从Weakmap中返回即可
	if (hash.has(obj)) return hash.get(obj);

	let cloneObj = new obj.constructor;
	hash.set(obj, cloneObj);
	for (let key in obj) {
		if (obj.hasOenPropery(key)) {
			cloneObj[key] = deepClone(obj[key], hash);
		}
	}
	
	return cloneObj;
}
```

## 删除数组
```js
// 删除数组的方法用splice方法是一个 o(n)操作、
// 我们需要使用一个o(1)操作
function _slice(arr, index) {
	let ar = [...arr];
	let va = ar[index];
	ar[index] = ar[ar.length - 1]
	ar.pop()
	return [va, ar, arr];
}
```
## 创建一个从 n,m 的数组
```js
function rangeArray(begin, end) {
	const array = [];
	for (let i = begin; i <= end; i++){
		array.push(i);
	}
	return array;
}

```
## 移动数组中的内容
```js
function moveArray(array, fro, to){
	if (fro < 0 || to >= array.length) {
		throw Error('参数错误')
		return
	}
	const newArray = [...array];
	let item = newArray.splice(fro, 1);
	newArray.splice(to, 0, ...item);
	return newArray;
}
	
```

## 防抖

1 对于事件被触发n秒后再执行的回调 -> 延迟执行

2 如果在n秒内再触发事件，重新开始计时

问题：
污染全局 初次触发事件，会延迟执行

用途：
ajax请求数据 提交数据 输入验证

```js
function debounce(fn, time, triggleNow){
	var t = null,
		res;
	var debounced = function() {
		var _self = this,
			args = arguments;
		if(t) {
			clearTimeout(t)
		}
		if(triggleNow) {
			var exec = !it;
			t = setTimeout(function() {
				t = null;
			}, time);
			if(exec) {
				res = fn.apply(_self, args);
			}
		} else {
			t = setTimeout(function(){
				res = fn.apply(_self, args)
			})
		}
	}
	return debounced;
}
function test() {
	console.log(1)
}

oBox.onmouseover = debounce(test, 1000, true)

// 1 是否延迟

// 2 n 秒之内

// 复发事件不执行事件处理函数 （n秒之内频繁触发事件，计时器会频繁重新开始计时）
oBtn = document.getElementBtId("btn");
oBtn.onclick = debounce(btnClick, 1000, true);
	
function btnClick() {
	$.ajax({
		url: "http://www.baidu.com",
		type: "POST",
		dataType: "JSON",
		data: {
			page: 1
		},
		success: function(data){
			console.log(data);
		}
	})
}

var oInput = docrment.getElementById('input');

oInput.onkeyup = debounce(check, 1000, false);

function check() {
	var val = this.value;
	if(val.length < 6) {
		console.log("Invalid length");
	}else {
		console.log("success")
	}
}
```
## 节流

事件被触发 n秒之内只执行一次事件处理函数

```js
// 输入验证
var oInput = document.getElementById('input');

var t = null;

oInput.onkeyup = throttle(check, 1000);

// function check() {
// 	clearTimeout(t);
// 	var val = this.value;
// 	t = setTimeout(function() {
// 		if(val.length < 6){
// 			console.log("Invalid length")
// 		} else {
// 			console.log("Success")
// 		}
// 	}, 1000)
// }
function check() {
	var val = this.value;
	if(val.length < 6){
		console.log("Invalid length")
	} else {
		console.log("Success")
	}
}


function throttle(fn, delay){
	var t = null,
		begin = new Date().getTime();
	return function() {
		var _self = this,
			args = arguments,
			cur = new Date().getTime();
		clearTimeout(t);
		if(cur - begin >= delay){
			fn.apply(_self, args);
			begin = cur;
		} else {
			t = setTimeout(function() {
				fn.apply(_self, args);
			}, delay);
		}
	}
}

```