
# 2. JS类型 

## Atom

    | Grammar         | Runtime           |
    | --------------- | ----------------- |
    | Literal         | Types             |
    | Variable        | Execution Context |
    | keywords        |                   |
    | Whitespace      |                   |
    | Line Terminator |                   |

## Types

- **Number**

  - IEEE 754 Double Float
	- Sign(1)
	- Exponent（11位指数位，含1位符号位  log<sub>10</sub>(2<sup>1024</sup>)  ≈  308）
	- Fraction（52位二进制小数位，默认1.xxxx  log<sub>10</sub>(2<sup>53</sup>)  ≈  15.94）
  - Grammar
	- DecimallLiteral
	  - 0
	  - 0.
	  - .2
	  - 1e3
	- BinaryIntegerlitral
	  - ob111
	- OctalIntegerLiteral
	  - 0o10
	- HexIntegerLiteral
	  - 0xFF\
  - 注意的坑    
	- 0.toString();
	- 0 .toString();

- **String**

  - Character

  - Code Point

	- ASCII
	- Unicode
	- UCS
	- GB
	  - GB2312
	  - GBK(GB13000)
	  - GB18030
	- ISO-8859
	- BIG5

  - Encoding

  - Homework

	```javascript
	// 把一个String它代表的字节给转换出来，用utf8对string进行编码
	/**
	* @param {string} str
	* @return {Array}
	*/
	var UTF8_Encoding = function(str) {
		function charToUtf8(char) {
			var code = encodeURI(char);
			var codeList = code.split('%');
			codeList = codeList.filter(item => {
				if(item){
					return parseInt(item,16)
				}
			});
			return codeList.join('|')
		}
		return Array.from(str).map((char) => charToUtf8(char));
	}
	console.log(UTF8_Encoding('张寒'));
	```
        
  - Grammar
  
	- "abc"
	- 'abc'
- `abc`
  
  - **Boolean**
    
    - **Object**
    
    - **Null**
    
      ```
      定义了但没有赋值
      是一个关键字
      ```
    
      
    
    - Undefined
    
      ```
      未定义
      是全局变量
      ```
    
      
    
    - Symbol
  
- JS对象 | 对象的基础知识

  - 鱼
    - 标识符（identifier）
    - 状态（state）
    - 行为（behavior）
  - 在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则。

- JS对象 | JS中的对象

  - 在JavaScript运行时，原生对象的描述方式非常简单，我们只需要关心原型和属性两个部分。

  - javascript 用属性来统一抽象对象状态和行为。

  - 一般来说数据属性描述状态，访问器属性则用于迷哦奥数行为。

  - 数据属性中如果存储函数，也可以用于描述行为。

    | Data Property | Accessor Property |
    | ------------- | ----------------- |
    | [[value]]     | get               |
    | writable      | set               |
    | enumerable    | enumerable        |
    | configurable  | configurable      |

    ```javascript
    当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有此名称的属性，
	而原型对象还可能有原型，因此，会有“原型链这一说法“。
    这一算法保证了，每个对象只需要描述自己和原型的区别即可
    ```

    

  - API/Grammar

    - {} . [] Object.defineProperty
    - Object.create / Object.setPrototypeOf / Object.getPrototypeOf
    - new /class / extends
    - new / function /prototype
  
  - Funciton Object
  
    ```javascript
    前面讲述了JavaScript中的一般对象
    但是JavaScript中还有一些特殊的对象，比如函数对象。
    除了一般对象的属性和原型，函数对象还有一个行为[[call]]。
    我们用JavaScript中的function关键字、箭头运算符或者Function构造器创建的对象，
	会有[[call]]这个行为。
    我们用类似f()这样的语法把对象当做函数调用时，会访问到[[call]]这个行为。
    如果对应的对象没有[[call]]行为，则会报错。
    ```
  
  - Special Object
  
    - Array[[length]]
    
    - Object.prototype[[setPrototypeOf]]
    
   ```javascript
   Array[[length]]
   bject.prototype[[setPrototypeOf]]
   argument
   ```
    
      
    
  - Host Object
  
    | 序号 | 单词类型 | 种别                                | 种别码                   |
    | ---- | -------- | ----------------------------------- | ------------------------ |
    | 1    | 关键字   | program、if、else、then、....       | 一词一码                 |
    | 2    | 标识符   | 变量名、数组名、记录名、过程名、... | 多词一码                 |
    | 3    | 常量     | 整形、浮点型、字符型、布尔型、...   | 一型一码                 |
    | 4    | 运算符   | 算术（+ - * / ++ --）               | 一词一码 或 一型一码 |
    | 5    | 界限符   | ; () = {}....                       | 一词一码                 |
