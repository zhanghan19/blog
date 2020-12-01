# 5. Structure
- Atom

  | Grammar         | Runtime           |
  | --------------- | ----------------- |
  | Literal         | Types             |
  | Variable        | Execution Context |
  | Keywords        |                   |
  | Whitespace      |                   |
  | Line Terminator |                   |


- Expression

  | Grammar                                | Runtime         |
  | -------------------------------------- | --------------- |
  | Grammar Tree vs Priority /praɪˈɔːrəti/ | Type Convertion |
  | Left hand side & Right hand side       | Reference       |

- Statement

  | Grammar  | Runtime             |
  | -------- | ------------------- |
  | 简单语句 | Completion Record   |
  | 组合语句 | Lexical Environment |
  | 声明     |                     |
  
- Structure

- Program/Module
## js执行粒度 运行时

- 宏任务

- 微任务（Promise)

- 函数调用(Execution Context)

- 语句/声明（Completion Record)

- 表达式（Reference）

- 直接量/变量/this....

- 事件循环

  ```javascript
  get code -> execute -> wait // 依次循环
  ```

- 函数调用

  ```javascript
  |-----------------------------------------------------------|
  |Execution Context    Execution Context    Execution Context|
  |    i:0					X:1					y:2		|
  |---------------------------------------------------------->|
  |    			Execution Context Stack					 |
  |---------------------------------------------------------->|
      				Running Execution Context
                      
  Execution Context  ==> code evaluation state（用于async generator，代码执行到哪的信息）
  	i:0              ==> Funtion
      			     ==> Script or Module
                     ==> Generator
                     ==> Realm(保存所有的内置对象)
                     ==> LexicalEnvironment（执行代码中所需要的环境保存变量的）
                     ==> VariableEnvironment（用var声明变量会声明到哪）
  ```

  - Execution Context

    ```javascript
    - ECMAScript Code Execution Context    - Generator Execution Contexts
    	- code evaluation state			   - code evaluation state
    	- Funtion						   - Funtion
        - Script or Module				   - Script or Module
        - Realm							   - Realm
        - LexicalEnvironment			   - LexicalEnvironment
        - VariableEnvironment              - VariableEnvironment
    									   - Generator
    ```

  - LexicalEnvironment

    - this
    - new.target
    - super
    - 变量

  - VariableEnvironment

    - VariableEnvironment是一个历史遗留的包袱，仅仅用于处理var声明

  - Environment Record

    ```javascript
    Environment Records ==> Declarative 				 ==> Function(Environment Records)
    					(Environment Records)			==> module(Environment Records)
    				  ==> Global (Environment Records)
    				  ==> Object (Environment Records)
    ```

  - Funtion-Closure

    ```javascript
    var y = 2;
    function foo2() {
        console.log(y)
    }
    export foo2;
    
    Function: foo2
    	Environment Record:
    		y:2
    	Code:
    		console.log(y)
    
    var y = 2;
    function foo2() {
        var z = 3;
        return () => {
            console.log(y, z)
        }
    }
    var foo3 = foo2();
    export foo3;
    
    Function: foo3
    	Environment Record:			Environment Record:
    		z:2				==>			y:2
    		this:global
    	Code:
    		console.log(y, z)
    ```

  - Realm

    - 在js中，函数表达式和对象直接量均会创建对象。
    - 使用 **.** 做隐士转换也会创建对象。
    - 这些对象也是有原型的，如果我们没有Realm，就不知到他们的原型是什么。
