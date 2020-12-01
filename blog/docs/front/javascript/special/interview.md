# 面试题

## this指向
案例：

```js
function Foo() {
	getName = function() {
		console.log(1);
	}
	return this;
}

Foo.getName = function() {
	console.log(2)
}
Foo().getName()
```

## 两个变量的值互换

```js
// 法一
var a = 1, b = 2;
console.log(a,b)
a = a ^ b;
b = a ^ b;
a = a ^ b;
console.log(a,b)

// 法二
var a = 1, b = 2;
a = [a,b]
console.log(a)
b = a[0]
a = a[1]
console.log(a,b)
```


