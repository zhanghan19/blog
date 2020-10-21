# 4. 语句
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
## Satement

```javascript
if(x == 1)
    return 10;
// 以上语句执行结果 有可能有retrun 也可能没有return取决于 x 具体的值，
// 所以对于我们运行时来说，js引擎就是解析if 的语句的时候，
// 就需要知道完成之后到底是怎么完成的
// 于是js语言里面就需要一种数据结构来存储语句的完成的结果
// 这就是我们的 Completion Record类型了

我们需要一个数据结构来描述语句的执行结果：是否返回了？返回值是啥？等等....

```

- Completion Record

  - [[type]]: normal, break, continue, return, or throw
  - [[value]]: 基本类型
  - [[target]]: label

- 简单语句

  - ExpressionStatement
  - Emptystatement
  - DebuggerStatement
  - ThrowStatement
  - ContinueStatement
  - BreakStatement
  - RetrunStatement

- 复合语句

  - BlockStatement

    ```javascript
    {
        ...
    }
    // 一个大括号中间是语句列表
    ```

    - [[type]]: normal
    - [[value]]: --
    - [[target]]: --

  - IfStatement

  - SwitchStatement

    ```javascript
    // 在js中不建议使用，用if代替
    // 在c/c++中使用可以提高速度，js中并没有容易写错
    ```

    

  - IterationStatement

    ```javascript
    while(表达式) 语句
    do 语句 while(表达式)
    for(var/let; 表达式 ; 表达式) 语句
    for(var/let; in ; 表达式 ) 语句
    for(var/let; of; 表达式) 语句
    for await(of )    
    ```

    

  - WithStatement

    ```javascript
    广受诟病不建议使用
    ```

  - LabelledStatement

  - TryStatement

    ```javascript
    try{
        
    } catch {
        
    } finally {
        
    }
    
    // try 里面不是BlockStatement 它的花括号是由try语句定义的
    
    
    // try catch finally 中使用return不起作用
    
    ```

    - [[type]]: return
    - [[value]]: --
    - [[target]]: label

- 标签、循环、break、continue

  - LabelledStatement

  - IteratinStatement

  - ContinueStatement

  - BreakStatement

  - SwitchStatement

    ```javascript
    [[type]]: break continue
    [[value]]: --
    [[target]]: label
    ```

- 声明

  - FunctionDeclaration

  - GeneratorDeclaration

  - AsyncFunctionDeclaration

  - AsyncGeneratorDeclaration

  - VariableStatement

  - ClassDeclaration

  - LexicalDeclaration

    ```javascript
    function
    function *
    async function
    async function *
    var 
    class
    const
    let
    ```

  - 预处理

    ```javascript
    var a = 2;
    void function () {
        a = 1;
        return
        var a;
    }();
    console.log(a);
    
    var a = 2;
    void function () {
        a = 1;
        return ;
        const a;
    }();
    console.log(a)
    ```

  - 作用域