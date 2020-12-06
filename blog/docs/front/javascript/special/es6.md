# ECMAScript 6-11

## ECMASript 相关介绍
### 什么是ECMA

::: theorem ECMA（European Computer Manufacturers Association）
中文名称为欧洲计算机制造商协会，这个组织的目标是评估、开发和认可电信和计算机标准。1994 年后该组织改名为 Ecma 国际。
:::


### 什么是ECMAScript
::: theorem ECMAScript
ECMAScript 是由 Ecma 国际通过 ECMA-262 标准化的脚本程序设计语言。
:::

### 什么是ECMA-262
::: theorem ECMA-262
Ecma 国际制定了许多标准，而 ECMA-262 只是其中的一个，所有标准列表查看

::: right
[点击查看](http://www.ecma-international.org/publications/standards/Standard.htm)
:::

### ECMA-262历史

[ECMA-262（ECMAScript）历史版本查看网址](http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm****)

|版本| 年份 | 内容|
|----|----|----|
|第 1 版| 1997 年 | 制定了语言的基本语法|
|第 2 版| 1998 年 | 较小改动|
|第 3 版| 1999 年 | 引入正则、异常处理、格式化输出等。IE 开始支持|
|第 4 版| 2007 年 | 过于激进，未发布|
|第 5 版| 2009 年 | 引入严格模式、JSON，扩展对象、	数组、原型、字符串、日期方法|
|第 6 版| 2015 年 | 模块化、面向对象语法、Promise、箭头函数、let、const、数组解构赋值...|
|第 7 版| 2016 年 | 幂运算符、数组扩展、Async/await 关键字|
|第 8 版| 2017 年 | Async/await、字符串扩展|
|第 9 版| 2018 年 | 对象解构赋值、正则扩展|
|第 10 版| 2019 年 | 扩展对象、数组方法|
| ES.next| 动态指向下一个版本| |

::: warning 注：
从 ES6 开始，每年发布一个版本，版本号比年份最后一位大 1
::: 

### 谁在维护ECMA-262

TC39（Technical Committee 39）是推进 ECMAScript 发展的委员会。其会员都是
公司（其中主要是浏览器厂商，有苹果、谷歌、微软、因特尔等）。TC39 定期
召开会议，会议由会员公司的代表与特邀专家出席

### 为什么要学习ES6

- ES6 的版本变动内容最多，具有里程碑意义
- ES6 加入许多新的语法特性，编程实现更简单、高效
- ES6 是前端发展趋势，就业必备技能

### ES6 兼容性

[查看兼容性](http://kangax.github.io/compat-table/es6/)

## ECMASript 6 新特性

### let关键字

let 关键字用来声明变量，使用 let 声明的变量有几个特点：
- 不允许重复声明
- 块儿级作用域
- 不存在变量提升
- 不影响作用域链
- 不影响全局变量(let 变量存储在environment)
::: tip 应用场景：
以后声明变量使用 let 就对了
:::

### const关键字

const 关键字用来声明常量，const 声明有以下特点
- 声明必须赋初始值
- 标识符一般为大写(没有const之前的命名习惯，)
- 不允许重复声明
- 值不允许修改
- 块儿级作用域

::: warning 注意: 
对象属性修改和数组元素变化不会出发 const 错误
::: 

::: tip 应用场景：
声明对象类型使用 const，非对象类型声明选择 let
::: 

### 变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构赋值。

- 数组的解构赋值
```js
const arr = ['张学友', '刘德华', '黎明', '郭富城'];
let [zhang, liu, li, guo] = arr;
```
- 对象的解构赋值

```js
const lin = {
	name: '林志颖',
	tags: ['车手', '歌手', '小旋风', '演员']
};
let {name,tags} = lin;
//复杂解构
let wangfei = {
	name: '王菲',
	age: 18,
	songs: ['红豆', '流年', '暧昧', '传奇'],
	history: [{
			name: '窦唯'
		},
		{
			name: '李亚鹏'
		},
		{
			name: '谢霆锋'
		}
	]
};
let {
	songs: [one, two, three],
	history: [first, second, third]
} = wangfei;
```

::: warning 注意：
频繁使用对象方法、数组元素，就可以使用解构赋值形式
:::


### 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识，特点：
- 字符串中可以出现换行符
- 可以使用 ${xxx} 形式输出变量

```js
// 定义字符串
let str = `<ul>
			<li>沈腾</li>
			<li>玛丽</li>
			<li>魏翔</li>
			<li>艾伦</li>
		   </ul>`;
// 变量拼接
let star = '王宁';
let result = `${star}在前几年离开了开心麻花`;
```
::: warning 注意：
当遇到字符串与变量拼接的情况使用模板字符串
:::

### 简化对象写法

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
let name = '尚硅谷';
let slogon = '永远追求行业更高标准';
let improve = function () {
	console.log('可以提高你的技能');
}
//属性和方法简写
let atguigu = {
	name,
	slogon,
	improve,
	change() {
		console.log('可以改变你')
	}
};
```
::: warning 注意：
对象简写形式简化了代码，所以以后用简写就对了
:::

### 箭头函数

ES6 允许使用「箭头」（=>）定义函数。

```js
/**
* 1. 通用写法
*/
let fn = (arg1, arg2, arg3) => {
 return arg1 + arg2 + arg3;
}
```
箭头函数的注意点:
- 如果形参只有一个，则小括号可以省略
- 函数体如果只有一条语句，则花括号可以省略，函数的返回值为该条语句的执行结果
- 箭头函数 this 指向声明时所在作用域下 this 的值
- 箭头函数不能作为构造函数实例化
- 不能使用 arguments

```js
/**
* 2. 省略小括号的情况
*/
let fn2 = num => {
 return num * 10;
};
/**
* 3. 省略花括号的情况
*/
let fn3 = score => score * 20;
/**
* 4. this 指向声明时所在作用域中 this 的值
*/
let fn4 = () => {
	console.log(this);
}

let school = {
	name: '尚硅谷',
	getName(){
		let fn5 = () => {
			console.log(this);
		}
		fn5();
	}
};
```

::: warning 注意：
箭头函数不会更改 this 指向，用来指定回调函数会非常合适
:::

### rest 参数
ES6 引入 rest 参数，用于获取函数的实参，用来代替 arguments

```js
/**
 * 作用与 arguments 类似
 */
function add(...args) {
	console.log(args);
}
add(1, 2, 3, 4, 5);
/**
 * rest 参数必须是最后一个形参
 */
function minus(a, b, ...args) {
	console.log(a, b, args);
}
minus(100, 1, 2, 3, 4, 5, 19);

```
::: warning 注意：
rest 参数非常适合不定个数参数函数的场景
:::

### spread 扩展运算符

扩展运算符（spread）也是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列，对数组进行解包。****

```js
/**
 * 展开数组
 */
let tfboys = ['德玛西亚之力', '德玛西亚之翼', '德玛西亚皇子'];

function fn() {
	console.log(arguments);
}
fn(...tfboys)
/**
 * 展开对象
 */
let skillOne = {
	q: '致命打击',
};
let skillTwo = {
	w: '勇气'
};
let skillThree = {
	e: '审判'
};
let skillFour = {
	r: '德玛西亚正义'
};
let gailun = { ...skillOne,
	...skillTwo,
	...skillThree,
	...skillFour
};

```

### Symbol

#### Symbol 基本使用

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。

Symbol 特点

- Symbol 的值是唯一的，用来解决命名冲突的问题
- Symbol 值不能与其他数据进行运算
- Symbol 定义 的 对象属性不能使用for…in循环遍历，但是可以使用Reflect.ownKeys 来获取对象的所有键名

```js
//创建 Symbol
let s1 = Symbol();
console.log(s1, typeof s1);

//添加标识的 Symbol
let s2 = Symbol('尚硅谷');
let s2_2 = Symbol('尚硅谷');
console.log(s2 === s2_2);

//使用 Symbol for 定义
let s3 = Symbol.for('尚硅谷');
let s3_2 = Symbol.for('尚硅谷');
console.log(s3 === s3_2);
```
::: warning 注: 
遇到唯一性的场景时要想到 Symbol
:::

#### Symbol 内置值
除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为它们会在特定的场景下自动执行。
| 属性 | 描述 |
|----|----|
|Symbol.hasInstance |当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法|
|Symbol.isConcatSpreadable |对象的 Symbol.isConcatSpreadable 属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开。|
|Symbol.species |创建衍生对象时，会使用该属性|
|Symbol.match |当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值。|
|Symbol.replace |当该对象被 str.replace(myObject)方法调用时，会返回该方法的返回值。|
|Symbol.search |当该对象被 str.search (myObject)方法调用时，会返回该方法的返回值。|
|Symbol.split |当该对象被 str.split(myObject)方法调用时，会返回该方法的返回值。|
|Symbol.iterator |对象进行 for...of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器|
|Symbol.toPrimitive |该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。|
|Symbol. toStringTag |在该对象上面调用 toString 方法时，返回该方法的返回值|
|Symbol. unscopables |该对象指定了使用 with 关键字时，哪些属性会被 with环境排除。|


### 迭代器

遍历器（Iterator）就是一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

- ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费
- 原生具备 iterator 接口的数据(可用 for of 遍历)
	- Array
	- Arguments
	- Set
	- Map
	- String
	- TypedArray
	- NodeList

- 工作原理
	- 创建一个指针对象，指向当前数据结构的起始位置
	- 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
	- 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
	- 每调用 next 方法返回一个包含 value 和 done 属性的对象

::: warning 注: 
需要自定义遍历数据的时候，要想到迭代器。
:::

### 生成器

生成器函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同

```js
function * gen(){
	 yield '一只没有耳朵';
	 yield '一只没有尾巴';
	 return '真奇怪'; 
}
let iterator = gen();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```
代码说明：
- `*` 的位置没有限制
- 生成器函数返回的结果是迭代器对象，调用迭代器对象的 next 方法可以得到yield 语句后的值
- yield 相当于函数的暂停标记，也可以认为是函数的分隔符，每调用一次 next方法，执行一段代码
- next 方法可以传递实参，作为 yield 语句的返回值

### Promise

Promise 是 ES6 引入的异步编程的新解决方案。语法上 Promise 是一个构造函数，用来封装异步操作并可以获取其成功或失败的结果。
- Promise 构造函数: Promise (excutor) {}
- Promise.prototype.then 方法
- Promise.prototype.catch 方法

### Set
ES6 提供了新的数据结构 Set（集合）。它类似于数组，但成员的值都是唯
一的，集合实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进
行遍历，集合的属性和方法：

- size 返回集合的元素个数
- add 增加一个新元素，返回当前集合
- delete 删除元素，返回 boolean 值
- has 检测集合中是否包含某个元素，返回 boolean 值
- clear 清空集合，返回 undefined

```js
//创建一个空集合
let s = new Set();
//创建一个非空集合
let s1 = new Set([1,2,3,1,2,3]);
//集合属性与方法
//返回集合的元素个数
console.log(s1.size);
//添加新元素
console.log(s1.add(4));
//删除元素
console.log(s1.delete(1));
//检测是否存在某个值
console.log(s1.has(2));
//清空集合
console.log(s1.clear());
```

### Map


ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。Map 也实现了iterator 接口，所以可以使用『扩展运算符』和『for…of…』进行遍历。Map 的属性和方法：
- size 返回 Map 的元素个数
- set 增加一个新元素，返回当前 Map
- get 返回键名对象的键值
- has 检测 Map 中是否包含某个元素，返回 boolean 值
- clear 清空集合，返回 undefined

```
//创建一个空 map
let m = new Map();
//创建一个非空 map
let m2 = new Map([
 ['name','尚硅谷'],
 ['slogon','不断提高行业标准']
]);
//属性和方法
//获取映射元素的个数
console.log(m2.size);
//添加映射值
console.log(m2.set('age', 6));
//获取映射值
console.log(m2.get('age'));
//检测是否有该映射
console.log(m2.has('age'));
//清除
console.log(m2.clear());
```

### class 类

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

知识点：
- class 声明类
- constructor 定义构造函数初始化
- extends 继承父类
- super 调用父级构造方法
- static 定义静态方法和属性
- 父类方法可以重写

```js

//父类
class Phone {
	//构造方法
	constructor(brand, color, price) {
		this.brand = brand;
		this.color = color;
		this.price = price;
	}
	//对象方法
	call() {
		console.log('我可以打电话!!!')
	}
}
//子类
class SmartPhone extends Phone {
	constructor(brand, color, price, screen, pixel) {
		super(brand, color, price);
		this.screen = screen;
		this.pixel = pixel;
	}
	//子类方法
	photo() {
		console.log('我可以拍照!!');
	}
	playGame() {
		console.log('我可以玩游戏!!');
	}
	//方法重写
	call() {
		console.log('我可以进行视频通话!!');
	}
	//静态方法
	static run() {
		console.log('我可以运行程序')
	}
	static connect() {
		console.log('我可以建立连接')
	}
}
//实例化对象
const Nokia = new Phone('诺基亚', '灰色', 230);
const iPhone6s = new SmartPhone('苹果', '白色', 6088,
	'4.7inch', '500w');
//调用子类方法
iPhone6s.playGame();
//调用重写方法
iPhone6s.call();
//调用静态方法
SmartPhone.run();
```

### 数值扩展

#### 二进制和八进制
ES6 提供了二进制和八进制数值的新的写法，分别用前缀 0b 和 0o 表示。

#### Number.isFinite() 与 Number.isNaN() 
Number.isFinite() 用来检查一个数值是否为有限的

Number.isNaN() 用来检查一个值是否为 NaN

#### Number.parseInt() 与 Number.parseFloat() 
ES6 将全局方法 parseInt 和 parseFloat，移植到 Number 对象上面，使用不变。

#### Math.trunc
用于去除一个数的小数部分，返回整数部分。

#### Number.isInteger
Number.isInteger() 用来判断一个数值是否为整数


### 对象扩展
ES6 新增了一些 Object 对象的方法
- Object.is 比较两个值是否严格相等，与『===』行为基本一致（+0 与 NaN）
- Object.assign 对象的合并，将源对象的所有可枚举属性，复制到目标对象
- __proto__、setPrototypeOf、 setPrototypeOf 可以直接设置对象的原型

### 模块化
模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小文件组合起来。

#### 模块化的好处
模块化的优势有以下几点：
- 防止命名冲突
- 代码复用
- 高维护性

#### 模块化规范产品
ES6 之前的模块化规范有：
- CommonJS => NodeJS、Browserify
- AMD => requireJS
- CMD => seaJS

#### ES6 模块化语法
模块功能主要由两个命令构成：export 和 import。
- export 命令用于规定模块的对外接口
- import 命令用于输入其他模块提供的功能

##### 默认导入和默认导出

- 默认导出语法 export default 默认导出的成员
- 默认导入语法 import 接受名称 from '模块标识符'

```js
// 当前文件模块为 m1.js

// 定义私有成员 a 和 c

let a = 10

let c = 20 

// 外界访问不到变量 d , 因为它没有被暴露出去

let d = 30 

function show () {}

// 将本模块中的私有成员暴露出去，供其他模块使用

export default {
	a, b, show
}
```

```js

// 导入模块成员
import m1 from './m1.js'

console.log(m1)

// {a: 10, c: 20, show: [Function: show]}

// 如果没有导出模块默认导入为 {}
```


##### 按需导入和按需导出

- 按需导出语法 export let sl = 10 
- 按需导入语法 import { s1 } from '模块标识符'

```js
// 当前文件模块为 m1.js

// 向外按需导出变量 s1

export let s1 = "aaa"

export let s2 = "ccc"

export function say = function () {}
```

```js
// 导入模块成员
import { s1, s2 as ss2, say} from './m1.js'

console.log(s1) // aaa

console.log(ssa) // ccc

console.log(say) // [Funxtion: say]

```



##### 直接导入并执行模块代码

有时候，我们只想单纯执行某个模块中 的代码，并不需要得到模块中向外暴露的成员，此时，可以直接导入并执行模块代码。

```js
// 当前文件模块为m2.js

// 在当前模块中执行一个for 循环操作

for(let i = 0; i < 3; i++) {
	console.log(i)
}
```

```js
// 直接导入并执行模块代码
import './m2.js'
```



## ECMASript 7 新特性
### Array.prototype.includes
Includes 方法用来检测数组中是否包含某个元素，返回布尔类型值

### 指数操作符
在 ES7 中引入指数运算符 `「**」`，用来实现幂运算，功能与 Math.pow 结果相同

## ECMASript 8 新特性
### async 和 await
async 和 await 两种语法结合可以让异步代码像同步代码一样
#### async 函数
1. async 函数的返回值为 promise 对象，
2. promise 对象的结果由 async 函数执行的返回值决定

#### await 表达式
1. await 必须写在 async 函数中
2. await 右侧的表达式一般为 promise 对象
3. await 返回的是 promise 成功的值
4. await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

### Object.values 和 Object.entries
1. Object.values()方法返回一个给定对象的所有可枚举属性值的数组
2. Object.entries()方法返回一个给定对象自身可遍历属性 [key,value] 的数组

### Object.getOwnPropertyDescriptors
该方法返回指定对象所有自身属性的描述对象

## ECMASript 9 新特性

### Rest/Spread 属性
Rest 参数与 spread 扩展运算符在 ES6 中已经引入，不过 ES6 中只针对于数组，在 ES9 中为对象提供了像数组一样的 rest 参数和扩展运算符

```js
function connect({host, port, ...user}) {
 console.log(host);
 console.log(port);
 console.log(user);
}
connect({
 host: '127.0.0.1',
 port: 3306,
 username: 'root',
 password: 'root',
 type: 'master'
});
```
### 正则表达式命名捕获组
ES9 允许命名捕获组使用符号`『?<name>』`,这样获取捕获结果可读性更强
```js
let str = '<a href="http://www.atguigu.com">尚硅谷</a>';
const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/;
const result = reg.exec(str);
console.log(result.groups.url);
console.log(result.groups.text);
```

### 正则表达式反向断言
ES9 支持反向断言，通过对匹配结果前面的内容进行判断，对匹配进行筛选。
```js
//声明字符串
let str = 'JS5211314 你知道么 555 啦啦啦';
//正向断言
const reg = /\d+(?=啦)/;
const result = reg.exec(str);
//反向断言
const reg = /(?<=么)\d+/;
const result = reg.exec(str);
console.log(result);
```

### 正则表达式 dotAll 模式
正则表达式中点.匹配除回车外的任何单字符，标记『s』改变这种行为，允许行终止符出现
```js
let str = `
			<ul>
			 <li>
			 <a>肖生克的救赎</a>
			 <p>上映日期: 1994-09-10</p>
			 </li>
			 <li>
			 <a>阿甘正传</a>
			 <p>上映日期: 1994-07-06</p>
			 </li>
			</ul>`;
//声明正则
const reg = /<li>.*?<a>(.*?)<\/a>.*?<p>(.*?)<\/p>/gs;
//执行匹配
const result = reg.exec(str);
let result;
let data = [];
while(result = reg.exec(str)){
 data.push({title: result[1], time: result[2]});
}
//输出结果
console.log(data);
```

## ECMASript 10 新特性
### Object.fromEntries
### trimStart 和 trimEnd
### Array.prototype.flat 与 flatMap
### Symbol.prototype.description

## ECMASript 11 新特性
### String.prototype.matchAll
### 类的私有属性
### Promise.allSettled
### 可选链操作符
### 动态 import 导入
### globalThis 对象



## See Also

[推荐视频](https://www.bilibili.com/video/BV1uK411H7on)

[ES6 入门教程](https://es6.ruanyifeng.com/)
[ES6 in Depth](https://hacks.mozilla.org/category/es6-in-depth/)
[ECMAScript 6 Tools](https://github.com/addyosmani/es6-tools)
[Modern JS Cheatsheet](https://mbeaudru.github.io/modern-js-cheatsheet/)