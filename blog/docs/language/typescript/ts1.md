# ts基础

## 安装解析 TS 的工具包

```shell
npm i -g typexcript
```
typescript: 就是用来解析TS 的工具包。提供了tsc命令，实现了TS -> JS 的转化。

- 新建文件hello.ts
```ts
// hello.ts
console.log('hello TS')
```

- tsc hello.ts
- node hello.js

## 简化执行 TS 步骤

每次修改代码后都要重复执行两个命令才能执行TS代码，太繁琐

::: theorem 执行 TS 代码的两个步骤
1 tsc hello.ts

2 node hello.js
:::
简化方式： 使用ts-node 包，"直接" 在Node.js 中执行 TS 代码。
- 安装命令： 

```shell
npm i -g ts-node
```
**ts-node** 包内部偷偷的将 TS -> JS, 然后，执行JS代码。

**ts-node** 包提供了命令 **ts-node**, 用来执行 TS 代码。

## 什么是变量
通俗的讲：变量是用来存储数据的容器，并且可以变化

保温杯里泡枸杞，变量里面存数据。

枸杞难挡岁月催，杯里再换点当归：枸杞 -> 当归。

## 变量的使用

变量的使用分两步：1 声明变量并制定类型 2 给变量赋值。

第一步：声明变量指定类型
```ts
let age: number;
```

第二步：给变量赋值

```ts
age = 18
```

声明并赋值

```ts
let age: number = 18
```

## 类型注解

示例代码：

```ts
let age: number = 18
```

代码中的 **:numbber** 就是类型注解。
::: theorem 类型注解
是一种为变量添加类型约束的方式。

重要：约定了什么类型，就只能给变量赋什么类型的值。
:::

## 变量的命名规范
- 变量名称只能出现： 数字，字母，下划线（_）、美元符号（$），并且不能以数字开头
注意：变量名称区分大小写。

## 数据类型概述


## 基本数据类型
```ts
// 原始类型
let bool: boolean = true
let num: number = 123
let str: string = 'abc'
// str = 23

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number | string> = [1, 2, 3, "4"]

// 元组
let tuple: [number, string] = [0, '1']
// tuple.push(2)
// console.log(tuple)
// tuple[2]



// 函数
let add = (x: number, y: number) => x + y
let comput: (x: number, y: number) => number
comput = (a, b) => a + b;

// 对象
let obj: object = {x: 1, y: 2}
obj.x = 3

// symbol
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2)

// undefined, null 是类型的子类型
let un: undefined = undefined
let nu: null = null
num = undefined
num = null

// void
let noReturn = () => {}

// any
let x
x = 1
x = []
x = () => {}
```


## 枚举
一个角色判断的例子

```js
function initByRole(role) {
	if(role === 1 || role === 2) {
		// do sth
	} else if (role === 3 || role === 4) {
		// do sth
	} else if (role === 5) {
		// do sth
	} else {
		// do sth
	}
}
```
问题：
- 可读性差：很难记住数字的含义
- 可维护性差：硬编码，牵一发动全身

::: theorem 枚举
一组有名字的常量集合
:::

数字枚举
```ts
enum Role {
	Reporter = 1,
	Developer,
	Maintainer,
	Owner,
	Guest
}
```
字符串枚举

```ts
enum Message {
	Success = '恭喜你，成功了',
	Fail = '抱歉，失败了'
}
```

异构枚举
```ts
enum Answer {
	N,
	Y = 'yes'
}
```

枚举成员
```ts
enum Char {
	// const 枚举
	a,
	b = Char.a,
	c = 1 + 3,
	// computed 枚举
	d = Math.random(),
	e = '123'.length
}
```

常量枚举

```ts
const enum Month {
	Jan,
	Feb,
	Mar
}
let month = [Month.Jan, Month.Feb, Month.Mar]
```

枚举类型
```ts
enum E {a, b}
enum F {a = 0, b = 1}
enum G {a = 'apple', b = 'bababa'}

let e: E = 3
let f: F = 3
// e === f

let e1: E.a = 1
let e2: E.b
// e1 === e2
let e3: E.a = 1
e1 === e3

let g1: G = G.b
let g2: G.a
```

## interface
- 对象类型接口

```ts
interface List {
	readonly id: number;
	name: string;
	// [x: string]: any;
	age?: number
}

interface Result {
	data: List[]
}

function render(result: Result) {
	result.data.forEach((value) => {
		console.log(value.id, value.name)
	})
}

let result = {
	data: [
		{id: 1, name: 'A', sex: 'male'},
		{id: 2, name: 'B'}
	]
}
render(result)
// render({
// 	data: [
// 		{id: 1, name: 'A', sex: 'male'},
// 		{id: 2, name: 'B'}
// 	]
// } as Result)
// render(<Result>{
// 	data: [
// 		{id: 1, name: 'A', sex: 'male'},
// 		{id: 2, name: 'B'}
// 	]
// })


// 可索引的接口

interface StringArray {
	[index: numnber]: string
}
let chars: StringArray = ['A', 'B']

interface Names {
	[x: string]: string;
	// y: number;
	[z: number]: string;
}
```
::: warning 索引接口
数字索引的返回值一定要是字符串索引返回值的子类型 这是因为JavaScript会进行类型装换，将number转换为string
:::

- 函数类型的接口

```ts
// 函数定义

// 直接定义
function add1(x: number, y: number) {
	return x + y
}

// 通过变量定义函数类型
let add: (x: number, y: number) => number

// 通过接口定义函数类型
interface Add {
	(x: number, y: number): number
}

// 类型别名定义函数类型
type Add = (x: number, y:number) => number

let add: Add = (a, b) => a + b

interface Lib {
	(): volid;
	version: string
	doSomething(): void;
}

function getLib() {
	let lib: Lib = (() => {}) as Lib;
	lib.version = '1.0';
	lib.doSomething = () => {}
	return lib;
}

let lib1 = getLib();
lib1();
lib1.doSomething();
let lib2 = getLib();

// 函数参数

// 1 可选参数(可选参数必须放在必须参数之后)
function add5(x: number, y?: number) {
	return y ? x + y: x;
}

// 2 参数默认值
// 默认值参数在必选参数前是不可以省略的必须传入undefined才能启用默认值
function add6(x: number, y = 0, z: number, q = 1) {
	return x + y + z + q
}
console.lgo(add6(1, undefined, 3))

// 3 剩余参数

function add7(x: number, ...rest: number[]) {
	return x + rest.reduce((pre, cur) => pre + cur)
}

console.log(add(1,2,3,4,5))

// 函数重载 （函数的参数不同，返回值也不同）
function add8(...rest: number[]): number;
function add8(...rest: string[]): string;
function add8(...rest: any[]): any {
	let first = rest[0];
	if (typeof first === 'string') {
		return rest.join('')
	}
	if (typeof first === 'number') {
		return rest.reduce((pre, cur) => pre + cur)
	}
}

console.log(add8(1, 2, 3))
console.log(add8('1', '2', '3'))
```
## 类
无论在 ts 或 js 中类成员的属性都是实例的属性而不是原型的属性
类成员中的方法是原型对象的方法


```ts
 class Dog {
	 constructor(name: string) {
		 this.name = name
	 }
	 // constructor( public name: string) {}  // 实例属性简写形式
	 public name: string = 'dog'  // 类的成员默认都是共有的，这里我们也可以显示声明
	 run() {}
	 private pri() {}  // 私有成员只能类自己调用，实例和子类都不能调用
	 protected pro() {}  // 受保护成员只能在类或子类中访问不能再类的实例中访问
	 readonly legs: number = 12  // 只读属性一定要被初始化和实例属性是一样的
	 static food: string = 'bones'  // 类的静态属性只能通过类名来调用 静态属性也可以被继承
 }
 
 console.log(Dog.prototype)
 let dog = new Dog('wangwang')
 console.log(dog)
 
 class Husky extends Dog {
	 constructor (name: string, color: string) {
		 super(name)
		 this.color = color;
	 }
	 color: string
 }
```

## 抽象类

::: theorem 抽象类
只能被继承不能被实例化
:::

```ts
abstract class Animal {
	eat() {
		console.log('eat')
	}
	abstract sleep(): void
}
// let animal = new Animal()

class Dog extends Animal {
	constructor(name: string) {
		super()
		this.name = name
	}
	name: string
	run() {}
	sleep() {
		console.log('dog sleep')
	}
}
let dog = new Dog('wangwang')
dog.eat()

// 多态

class Cat extends Animal {
	sleep() {
		console.log('Cat sleep')
	}
}
let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach(i => {
	i.sleep()
})

// this
class workFlow {
	step1() {
		return this;
	}
	step2() {
		return this;
	}
}
new WorkFlow().step1().step2()

class Myflow extends WorkFlow {
	next() {
		return this;
	}
}

new Myflow().next().step1().next().step2()
```

## 类与接口的关系
接口约束类
```ts
interface Human {
	// new (name: string): void
	name: string;
	eat(): void;
}

class Asian implements Human {
	constructor(name: string) {
		this.name = name;
	}
	name: string
	// private name: string
	eat() {}
}

// 接口的继承接口

interface Man extends Human {
	run(): void
}

interface Child {
	cry(): void
}

interface Boy extends Man, Child {
	let boy: Boy = {
		name: '',
		run() {},
		eat() {},
		cry() {}
	}
}

// 接口继承类

class Auto {
	state = 1
	// private state2 = 0
}

interface AutoInterface extends Auto {
	
}

class C implements AutoInterface {
	state = 1
}

class Bus extends Auto implements AutoInterface {
	
}

```
::: warning
接口只能约束类的公有成员

接口不能约束类的构造函数
:::
![raA1js.md.png](https://s3.ax1x.com/2020/12/20/raA1js.md.png)

## 泛型

一个打印函数
```ts
function log(value: string): string {
	console.log(value);
	return value;
}

// 函数重载
function log(value: string): string;
function log(value: string[]): string[];
function log(value: any) {
	console.log(value);
	return value;
}

// 联合类型
function log(value: string | string[]): string | string[] {
	console.log(value);
	return value;
}

// any 类型
function log(value: any) {
	console.log(value);
	return value;
}
```
::: theorem 泛型
不预先确定的数据类型，具体的类型在使用的时候才能确定。
:::

```ts

// 利用泛型定义函数
function log<T>(value: T): T {
	console.log(value);
	return value;
}

log<string[]>(['a', 'b'])
log(['a', 'b']) // 类型推断

// 利用类型别名定义泛型函数类型
type Log = <T>(value: T) => T
let myLog: Log = log

// 接口的定义泛型函数类型
interface Log {
	<T>(value: T): T
}

interface Log<T> {
	(value: T): T
}
let myLog: Log<number> = log
myLog(1)

interface Log<T: string> {
	(value: T): T
}
let myLog: Log = log
myLog('1')
```
## 泛型类和泛型约束

```ts
class Log<T> {
	run(value: T) {
		console.log(value)
		return value
	}
}
let log1 = new Log<number>()
log1.run(1)
let log2 = new Log()
log2.run('1')


interface Lenth {
	length: number
}

function log<T extends Length>(value: T): T {
	console.log(value, value.length)
	return value
}

log([1])
log('123')
log({length: 1})
```
:::tip
1. 函数和类可以轻松地支持多种类型， 增强程序的扩展性

2. 不必写多条函数重载，冗长的联合类型声明，增强代码可读性

3. 灵活控制类型之间的约束
:::

::: warning
泛型不能约束类的静态成员
:::

## 类型检查机制

::: theorem 类型检查机制
TypeScript 编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。
作用： 辅助开发，提高开发效率

类型推断

类型兼容性

类型保护
:::

```ts
let a = 1;
let b = [1, null]

let c = (x = 1) => x + 1

window.onkeydown = (event) => {
	//console.log(event.burron)
}

interface Foo {
	bar: number
}

// let foo = {} as Foo

let foo: Foo = {
	bar: 1
}

// foo.bar = 1
```

## 类型的兼容性

::: theorem 类型的兼容性
当一个类型Y可以被赋值给另一个类型X时，我们就可以说类型X兼容类型Y

X兼容Y: X(目标类型) = Y(源类型)

::: details 案例
```ts
let s: string = 'a'
s = null

// null 是字符串的子类型

// 接口兼容性

interface X {
	a: any;
	b: any;
}

interface Y {
	a: any;
	b: any;
	c: any;
}

let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}
x = y
// y = x

// 函数兼容性

type Handler = {a: number, b: number} => void

function hof(handler: Handler) {
	return handler
}

// 1) 参数个数
let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2)

// 可选参数和剩余参数
let a = (p1: number, p2: number) => {}
let b = (p1?: number, p2?: number) => {})
let c = (...args: number[]) => {}

a = b
a = c
// b 不兼容 b 和 a
// b = c
// b = a
c = a
c = b

// 2) 参数类型
let handler3 = (a: string) => {}
hof(handler3)

interface Point3D {
	x: number;
	y: number;
	z: number;
}

interface Point2D {
	x: number;
	y: number;
}

let p3d = (point: Point3D) => {};
let p2d = (point: Point2D) => {};

p3d = p2d
// p2d = p3d

// 3) 返回值类型

let f = () => ({name: 'Alice'});
let g = () => ({name: 'Alice', location: 'Beijing'});
f = g
// g = f

// 函数重载
function overload(a: number, b: number): number;
function overload(a: string, b: string): string;
function overload(a: any, b: any): any {};

// 枚举兼容性

enum Fruit {Apple, Banana}
enum Color {Red, Yellow}
let fruit: Fruit.Apple = 3;
let no: number = Fruit.Apple
// let color: Color.Red = Fruit.Apple

// 类兼容性
class A {
	constructor(p: number, q: number) {}
	id: number = 1
	private name: string = ''
}
class B {
	static s = 1;
	constructor(p: number) {}
	id: number = 2
	private name: string = ''
}
let aa = new A(1, 2)
let bb = new B(1)

// aa = bb
// bb = aa

class C extends A {}
let cc = new C(1, 2)
aa = cc
cc = aa

// 泛型兼容性
interface Empty<T> {
	value: T
}

// let obj1: Empty<number> = {}
// let obj2: Empty<string> = {}
// obj1 = obj2
// 在泛型T被使用的时候不兼容

let log1 = <T>(x: T): T => {
	console.log('x')
	return x
}

let log2 = <u>(y: U): U => {
	console.log('y')
	return y
}

log1 = log2

// 泛型函数使用的时候不指定类型时 可以兼容
```

口诀：

结构之间兼容： 成员少的兼容成员多的
函数之间兼容：参数多的兼容参数少的
:::

## 类型保护机制
::: theorem 类型保护
TypeScript 能够在特定的区块中保证变量属于某种确定的类型

可以在此区块中放心地引用类型的属性，或者调用此类型的方法
::: 
```ts
enum Type { Strong, Week}

class Java {
	helloJava() {
		console.log('Hello Java')
	}
}

class JavaScript {
	helloJavascript() {
		console.log('hello Javascript')
	}
}

function isJava(lang: Java | JavaScript): lang is Java {
	return (lang as Java).helloJava !== undefined
}

function getLanguage (type: Type, x: string | number) {
	let lang = type === Type.Strong ? new Java() : newJavaScript()
	
	if (isJava(lang)) {
		lang.helloJava()
	} else {
		lang.helloJavaScript()
	}
		
	
	// if((lang as Java).helloJava) {
	// 	(lang as Java).helloJava()
	// } else {
	// 	(lang as JavaScript).helloJavaScript()
	// }
	
	// instanceof
	// if( lang instanceof Java) {
	// 	lang.helloJava()
	// } else {
	// 	lang.helloJavaScript()
	// }
	
	// in
	// if('java' in lang) {
	// 	lang.helloJava()
	// } else {
	// 	lang.helloJavaScript()
	// }
	
	// typeof
	// if (typeof x === 'string') {
	// 	x.length
	// } else {
	// 	x.toFixed(2)
	// }
	
	return lang
	
}
getLanguage(Type.Strong)
```
## 交叉类型和联合类型

::: theorem 交叉类型
交叉类型取所有类型的并集

::: details 点击查看代码
```ts
intrface DogInterface {
	run(): void
}
interface CarInterface {
	jump(): void
}
// 交叉类型取所有类型的并集
let pet: DogInterface & CarInterface = {
	run() {},
	jump() {}
}
```
:::

::: theorem 联合类型
联合类型变量并不具体只得是某一类型。

交叉类型取所有类型的交集
::: details 点击查看代码
```ts
let a: number | string = 'a'
let b: 'a' | 'b' | 'c'
let c: 1 | 2 | 3

intrface DogInterface {
	run(): void
}
interface CarInterface {
	jump(): void
}

class Dog implements DogInterface {
	run() {}
	eat() {}
}

class Cat implements CatInterface {
	jump() {}
	eat() {}
}
enum Master { Boy, Girl}
function getPet(master: Master) {
	let pet = master === Master.Boy ? new Dog() : new Cat();
	pet.eat()  // 联合类型只能访问交集
	// pet.run()
	return pet
}


// 

interface Square {
	king: "square";
	size: number;
}
interface Rectangle {
	kind: 'rectangle';
	width: number;
	height: number;
}
interface Circle {
	kind: 'circle',
	r: number
}

type Shape = Square | Rectangle | Circle
function area(s: Shape) {
	switch (s.kind) {
		case 'square':
			return s.size * s.size;
		case 'rectangle':
			return s.height * s.width;
		case 'circle':
			return Math.PI * s.r ** 2;
		default:
			return ((e: never) => {throw new Error(e)})(s)
	}
}

console.log(area({kind: 'circle', r: 1}))
```
:::

## 索引类型
```ts
let obj = {
	a: 1,
	b: 2,
	c: 3
}
function getCalues(obj: any, keys: string[]) {
	return keys.map(key => obj[key])
}
console.log(getValues(obj, ['a', 'b']))
console.log(getValues(obj, ['e', 'f']))

// keyof T
interface Obj {
	a: number,
	b: string
}
let key: keyof Obj

// T[K]
let value: Obj['a']

// T extends U

let obj = {
	a: 1,
	b: 2,
	c: 3
}
function getCalues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
	return keys.map(key => obj[key])
}
console.log(getValues(obj, ['a', 'b']))
console.log(getValues(obj, ['e', 'f']))
```

## 映射类型

::: theorem 映射类型
通过已有的类型映射出新的类型
:::

```ts
interface Obj {
	a: string;
	b: number;
	c: boolean;
}

// 映射只读
type ReadonlyObj = Readonly<Obj>

// 映射可选
type PartialObj = Partial<Obj>

// 映射自定义属性
type PickObj = Pick<Obj, 'a' | 'b'>

// 
type RecordObj = Record<'x' | 'y', Obj>

```
## 条件类型

```ts
// T extends U ? X : Y

type TypeName<T> = 
	T extends String ? "string":
	T extends number ? "number":
	T extends boolean ? "boolean":
	T extends undefined ? "undefined":
	T extends Funcrion ? "function":
	"object";

type T1 = TypeName<string>
type T2 = TypeName<string[]>

// (A | B) extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y)

type T3 = TypeName<string | string[]>

type Diff<T, U> = T extends U ? never : T

type T4 = Diff<"a" | "b" | "c", "a" | "e">
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e">
// never | "b" | "c"
// "b" | "c"

type NotNull<T> = Diff<T, undefined | null>
type T5 = NotNull<string | number | undefined | unll>

// Exclude<T, U>
// NoNullable<T>
// Extract<T, U>

type T6 = Extract<"a" | "b" | "c", "a" | "e">

// ReturnType<T>
type T7 = ReturnType<() => string>
```