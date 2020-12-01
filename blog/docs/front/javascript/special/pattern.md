
# javascript模式总结
::: theorem 模式
广义上模式是指“重现事件或者对象的主题。。。。它是一个可以用来产生其他事物的模板
或者模型”。

在软件开发过程中，模式是指一个通用问题的解决方案。一个模式不仅仅是一个可以用
来复制粘贴的代码解决方案，更多地是提供了一个更好得实践经验，有用得抽象化表示
和解决一类问题得模板。
:::






## 第二章：基本技巧
### 1. 少用全局变量

```javascript
在全局作用域中声明的变量为全局变量（使用var创建的变量不可以删除）
未经声明直接使用的变量为全局变量（不使用var创建的隐含全局变量可以删除）
```


### 2. 单一var模式（Single var Pattern)

```javascript
只使用一个var在函数顶部进行变量声明是一种非常有用的模式，它的好处在于：

1. 提供一个单一的地址查到函数需要的所有局部变量。
2. 防止出现变量在定义前就被使用的逻辑错误。
3. 帮助牢记要声明变量，以尽可能少地使用全局变量。
4. 更少的编码
```

### 3. 提升：零散变量的问题

```javascript
// 反模式
myname = "global";  // 全局变量
function func() {
    alert(myname);  // 未定义
    var myname = "local";
    alert(myname);  // 局部变量
}
func();

// 等同与
myname = "global";  // 全局变量
function func() {
    var myname; // 等同与 -> var myname = undefined;
    alert(myname);  // 未定义
    myname = "local";
    alert(myname);  // 局部
}
func();
```
### 4. for循环

```javascript
// 次优循环
for(var i = 0; i < myarray.length; i++){
// 对myarray[i]做操作
}
// 这种模式的问题在于每次循环时都要访问数据的长度。增加负荷，特别是当marrary不是数
// 据，而是HTML容器对象时如：
document.getElementsByName();
document.getElementsByClassName();
document.getElementsByTagName();
document.images // 页面上所有的img元素
document.links // 所有A元素
document.forms // 所有的Forms
document.forms[0].elements // 页面上第一个form内的所有字段  
/**
*容器的麻烦在于它们在document(HTML页面)下是活动的查询，也就是说，
*每次访问任何容器的长度时，也就是在查询活动的DOM，而通常DOM操作事非常耗时的。
*这就是为什么好的for循环模式是将遍历过的数组长度缓存起来。如以下代码所示。
*/
for(var i = 0; len = marray.length; i < len; i++){
// 对myarray[i]做操作
}

// 单变量循环模式
function looper() {
    var i = 0,
    max,
    myarray = [];
    for (i = 0, max = marray.length; i < max; i++){
    // 对myarray[i]做操作
    }
}

// 最后一个改进, 用 i++ 代替以下两种表达式；
i = i + 1;
i += 1;

```

### 5. for-in循环

```javascript
// for 循环处理数组 for-in循环处理对象
// 当遍历对象属性来过滤到原型链的属性时，
// 使用 hasOwnProoerty()方法是非常重要的。（详见书21页）
var man = {
    hands: 2,
    legs: 2,
    heads: 1
}

if(typeof Object.prototype.clone === "undefined") {
	Object.prototype.clone = function () {};
}

for (var i in man) {
    if (man.hasOwnProperty(i)){
    	console.log(i, ":", man[i]);
    }
}
/**
*   控制台结果
* 	hands : 2
*	legs : 2
*	heads : 1
*/


// 反模式
for (var i in man) {
	console.log(i, ":", man[i]);
}
/**
*   控制台结果
* 	hands : 2
*	legs : 2
*	heads : 1
*   clone: function()
*/
```

### 6. 不要增加内置的原型

::: theorem 
增加内置构造函数的原型是很有诱惑的，但是这可能会严重影响可维护性
:::


### 7. switch模式

```javascript
var inspect_me = 0,
    result = '';
    switch (inspect_me) {
    case 0;
    	result = "zero";
    	break;
    case 1:
    	result = "one";
    	break;
    default:
    	result = "unknown";
    }
    /**
    * switch 语句通常采用如下格式
    * 是每个case 和 switch 纵向排列整齐（大括号的缩进规则是个例外）。
    * 在每个case 语句中使用代码缩进。
    * 在每个case 语句结尾有一个明确的break语句。
    * 避免使用fall-throughs(也就是有意不使用break语句，以使得程序会按顺序一直向下执行)
    * 用 default 语句来作为switch的结束
    */
```



### 8. 避免使用隐式类型转换

```javascript
详见24页
```



### 9. 避免使用eval()

```javascript
// 反模式
var propery = "name";
alert(eval("obj." + property));

// 推荐的方式
var propery = "name";
alert(obj[propery]);
```



### 10. 使用parseInt()的数值约定
::: theorem 
通过使用parseInt(),可以从一个字符串中获取数值。该函数的第二个参数是一个进
制参数，通常可以忽略该参数，但是最好不要这样做，因为当解析的字符串是0开始就
会出现错误；
:::

### 11. 编码约定

     ```
     
     ```
### 12. 缩进
::: theorem 
建议使用四个空格
:::


### 13. 大括号
::: theorem 
应该经常使用大括号
应该一直使用大括号并直到将开放的大括号放置在前面语句的同一行；
:::


### 14. 空格

```javascript
 // 使用空格比较好的位置包含如下；
 // 在分开for 循环的各个部分的分号之后；例如：
 for (var i = 0; i < 10; i +=1 ) {
 	...
 }
    
 // 在for循环中初始化多个变量（i和最大值等）：
 for (var i = 0, max = 10; i < max; i += 1){
 	...
 }
    
 // 在限定数组项的逗号后面：
 var a = [1, 2, 3];
     
 // 对象属性的逗号之和将属性名和属性值分开的冒号之后：
 var o = {a: 1, b: 2};
     
 // 分隔开函数中各个参数的逗号之后：
 myFunc(a, b, c);

 // 在函数声明的大括号之前：
 function myFunc() {};
 
 // 在匿名函数表达是之后： 
 var myFunc = function () {};
 // 空格的另一个很好的用途是用来分隔所有的操作符和操作，这也就意味着在
     +， -， *， =， <, >, <=, >=, ===, !==, &&, ||, += 等之后使用空格：
```



### 15. 命名约定

```javascript
 // 另一个提高代码可预测性和可维护性的方法是使用命名约定。
 
 1. 构造函数的首字母大写
 	var adam = new Person();
 2. 分隔单词
 	MyContructor();  // 对于构造函数使用大驼峰
 	myFunction();  // 对于函数和方法名可以使用小驼峰
 	first_name;  // 对于不是函数或方法的可以使用小写中间用下滑线分开
 3. 其他命名模式
 	var PI = 3.14;  // 长量用大写字母表示
 	
 	var person = {
         getName: function () {
         	return this._getFirst() + ' ' + this._getLast();
         },
         _getFirst: function () {
             // 用一个下滑线前缀来标识私有方法或私有属性
         },
         _getLast: function () {
             
         }
     };
     
     ;(function () {
         var name_ = "admin"; // 使用下滑线结尾来表示私有变量
     })();
 	
 	// 使用一个下滑线前缀来标识受保护属性， 使用两个下划线前缀来标识私有属性。
 
```



### 16. 编写注释
::: theorem 
 为代码编写注释是非常重要的。即使该代码除了你之外没有人会看也要写注释。
:::



### 17. 编写API文档

::: theorem 
 生成API文档的步骤如下
  	1. 编写特殊格式的代码块。
  	2. 运行工具来解析代码和注释。
  	3. 发布工具解析结果， 大多数情况是采用 HTML 格式
:::


### 18. YUIDoc范例

```javascript

```



### 19.编写可读性强的代码

::: theorem
为api编写注释不仅仅是一种提供参考文档的简便方法，而且还有其他用途--通过再次审视代码，提高代码质量
:::



###  20. 同行互查



### 21. 在正式发布时精简代码
::: theorem
可以采用减少空白位置、注释和其他javascript代码中不重要的部分来减小需要从服务器端传给浏览器的javascript文件，以便加速页面载入速度。
:::

### 22. 运行JSLint



## 第三章：字面量和构造函数

::: theorem
在javascript中可以使用字面量表示（literal notation) 模式，这种方法更为准确，也更
富有表现力，并且在对对象定义中更不容易出错。本章主要讨论了通过字面量以构造对象的方
法，比如对象、数组以及正则表达式等字面量构造方法，同时还讨论了与类似Object（）和
Array（）等内置构造函数相比，为什么基于字面量表示法是更为可取。本章还引入了JASON格
式，并用以演示数组和对象字面量如何用于定义数据传输格式。此外，本章还讨论了自定义构造函数，以及增强new操作符以确保构造函数行为符合预期的方法。
:::

### 1. 对象字面量



### 2. 对象字面量语法



### 3. 来自构造函数的对象



### 4. 对象构造函数捕捉



### 5.自定义构造函数



### 6. 构造函数的返回值



### 7. 强制使用new的模式



### 8. 命名约定



### 9. 使用that



### 10. 自调用构造函数



### 11. 数组字面量



### 12. 数组字面量语法



### 13. 数组构造函数的特殊性



### 14.检擦数组性质



### 15.使用JSON



### 16. 正则表达式字面量



### 17.正则表达式字面量语法



### 18. 基本值包装器



### 19.错误对象



### 20. 小结



## 函数



### 

### 1. 背景



### 2. 消除术语的歧义



### 3. 声明Vs表达式： 名称和变量声明提升



### 4. 函数的命名属性



### 5. 函数的提升



### 6. 回调模式



### 7. 回调示例



### 8.回调与作用域



### 9. 异步事件监听器



### 10. 超时



### 11. 库中的回调模式



### 12. 返回函数



### 13.自定义函数



### 14. 即时函数



### 15. 及时函数的参数



### 16. 即时函数的返回值



### 17. 优点和用法



### 18. 即时对象初始化



### 19. 初始话时分支



### 20.函数属性——备忘模式



### 21. 配置对象



### 22. curry



### 23. 函数应用



### 24.部分应用



### 25. 何时使用curry



### 小结



## 对象创建方式



### 1. 命名空间模式



### 2. 通用命名空间函数



### 3. 声明依赖关系



### 4. 私有属性和方法



### 5. 私有成员



### 6. 特权方法



### 7. 私有性失效



### 8. 对象字面量以及私有性

### 9. 原型和私有性

### 10. 将私有方法揭示为共有方法

### 11. 模块模式

### 12. 揭示模块模式

### 13.将全局变量导入到模块中

### 14. 沙箱模式

### 15. 增加模块

### 16. 实现构造数

### 17. 静态成员

### 18. 公有静态成员

### 19. 私有静态成员

### 20. 对象常量

### 21. 链模式

### 22. method()方法

### 23. 小结

###### THE END













