# 状态机

## 有限状态机
- 每一个状态都是一个机器
	- 在每一个机器里，我们可以做计算、存储、输出...
	- 所有的这些机器接受的输入是一致的
	- 状态机的每一个机器本身没有状态，如果我们用函数来表示的话。他应该是纯函数（无副作用）

- 每一个机器知道下一个状态
	- 每个机器都有确定的下一个状态（Moore）
	- 每个机器根据输入决定下一个状态（Mealy）

## JS中的优先状态机（Mealy）
```js
// 每个函数是一个状态

function state(input) {  // 函数参数就是出入

// 在函数中，可以自由的编写代码，处理每个状态的逻辑
return next;  // 返回值作为下一个状态
}

// 一下是调用
while(input) {
	// 获取输入
	state = state(input);  // 把状态机的返回值作为下一个状态
}
```

## 使用优先状态机处理字符串

问题：
- 在一个字符串中，找到字符"a"

```js
function match(string) {
	for(let c of string) {
		if(c == "a")
			return true;
	}
	return false;
}

match("I am groot")
```
- 在一个字符串中，找到字符"ab"(不使用正则表达式)

```js
function match(string) {
	let foundA = false;
	for(let c of string) {
		if(c == "a")
			foundA = true;
		else if(foundA && c == "b")	
			return true;
		else
			foundA = false;
	}
	return false;
}

match("I am groot")
```
- 在一个字符串中，找到字符"abcdef"(不使用正则表达式)

```js
function match(string) {
	let foundA = false;
	let foundB = false;
	let foundC = false;
	let foundD = false;
	let foundE = false;
	let foundF = false;
	for(let c of string) {
		if(c == "a")
			foundA = true;
		else if(foundA && c == "b")
			foundB = true;
		else if(foundB && c == "c")	
			foundC = true;
		else if(foundC && c == "d")
			foundD = true;
		else if(foundD && c == "e")
			foundE = true;
		else if(foundE && c == "f")
			return true;
		else {
			foundA = false;
			foundB = false;
			foundC = false;
			foundD = false;
			foundE = false;
			foundF = false;
		}
			
	}
	return false;
}

console.log(match("I mabcdefgroot"));
```

- 在一个字符串中，找到字符"abcdef"(使用状态机)

```js
function match(string) {
	let state = foundA;
	for(let c of string) {
		state = state(c);
	}
	return state === end
}

function foundA(c) {
	if(c === "a")
		return foundB;
	else
		return foundA;
}

function foundB(c) {
	if(c === "b")
		return foundC;
	else
		return foundA(c);
}

function foundC(c) {
	if(c === "c")
		return foundD;
	else
		return foundA(c);
}
function foundD(c) {
	if(c === "D")
		return foundE;
	else
		return foundA(c);
}
function foundE(c) {
	if(c === "e")
		return foundF;
	else
		return foundA(c);
}

function foundF(c) {
	if(c === "f")
		return end;
	else
		return foundA(c);
}

function end(c) {
	return end;
}
console.log(match("I ababcdefgroot"));
```

- 我们如何使用状态机处理诸如"abcabx"这样的字符串

```js
function match(string) {
	let state = foundA;
	for(let c of string) {
		state = state(c);
	}
	return state === end
}

function foundA(c) {
	if(c === "a")
		return foundB;
	else
		return foundA;
}

function foundB(c) {
	if(c === "b")
		return foundC;
	else
		return foundA(c);
}

function foundC(c) {
	if(c === "c")
		return foundA1;
	else
		return foundA(c);
}

function foundA1(c) {
	if(c === "a")
		return foundB1;
	else
		return foundA(c);
}

function foundB1(c) {
	if(c === "b")
		return foundX;
	else
		return foundA(c);
}

function foundX(c) {
	if(c === "x")
		return end;
	else
		return foundA(c);
}

function end(c) {
	return end;
}
console.log(match("abcabx"));
```

## 练习
- 使用状态机完成"abababx"的处理
- 我们如何使用状态机处理完全未知的pattern?
(参考资料：[字符串 KMP 算法](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm))