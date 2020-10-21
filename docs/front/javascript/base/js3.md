# 3. 表达式

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

## Expression
- PrimaryExpression

- MemberExpression

  - a.b
  - a[b]
  - foo`string`
  - super.b
  - super['b']
  - new.target
  - new Foo()

- NewExpression

  - new Foo

    ```javascript
    Example:
    new a()()  // new a() => new a()()
    new new a()  // new a() => new new a()
    ```

- ReferenceObject

  - Object
- Key
  
- delete
  - assign
  
  ```javascript
  a.b 访问对象的属性
  但是它从属性取出来的可不是属性的值，它取出来的是一个引用包括 Object(a) 和 Key (b)
  delete 删除时需要知道删除的是哪一个对象的哪一个属性
  assign 赋值时需要知道把一个值赋值给哪一个对象的哪一个属性
  
  ```
  
- CallExpression

  - foo()

  - super()

  - foo()['b']

  - foo().b

  - foo()`abc`

    ```javascript
    Example
    new a()['b'];  // new a() => new a()['b'] new出来的一个a 对象访问b属性
    
    1. 最基础的callExpression就是一个函数后面跟了一对圆括号，他的优先级要低于new 同
    时也低于Member 运算，但是在括号之后加上取属性，比如[], .b, `abc`,那么他会让表达
    式降级为call Expression，也就是后面的点运算他的优先级也降低了。
    
    语法结构能够表达的是要多于运算符优先级所能表达的，像这种点运算它本身就可以有不同的优先级，它是它前面的语法结构来决定自己的优先级
    ```

- Left Handside & Right Handside 

  ```javascript
  Example:
  a.b = c  // 正确写法 a.b是左值表达式
  a+b = c  // 错误写法 a+b是右值表达式 
  在JavaScript中 Left Handside 一定是 Right Handside 
  ```

- Update：（Right Handside）

  - a ++

  - a --

  - a --

  - ++a

    ```javascript
    Example:
    ++a++
    ++(a++)
    ```

- Unary：单目运算符

  - delete a.b

  - void foo()

  - typeof a

  - +a

    ```javascript
    如果a不是数字会发生类型转换
    ```

    

  - -a

  - ~a

    ```javascript
    ~位运算：把一个整数按位取反，如果不是整数呢，那么它就会强制转换为整数
    ```

    

  - !a

  - await a

- Exponental

  - **(唯一一个有结合的运算符表示乘方)

    ```javascript
    Example:
    3**2**3
    // 3**(2**3)
    ```

- Multipli ative

  - (*， / ，%)

- Additive

  - (+， -)

- Shift

  - << ，>>， >>>

- Relationship

  - < ，> ，<= ，>= indtanceof in

- Equality

  - ==
  - !=
  - ===
  - !==

- Bitwise

  - & ^ |

- Logical

  - &&

  - ||

    ```javascript
    也叫短路运算符
    ```

    

- Conditional

  - ? ：

    ```javascript
    也有短路逻辑
    ```

## Type Convertion

- Unboxing

  - ToPremitive
  - toString vs valueOf
  - Symbol.toPrimitive

  ```javascript
  var o = {
      toString(){return "2"},
      valueOf(){return 1},
      [Symbol.toPrimitive](){return 3}
  }
  var x = {}
  x[o] = 1
  console.log("x" + o)
  
  // 1. 如果定义了toPrimitive会忽略toString和valueOf
  // 2. 如果没有toPrimitive加法优先调用valueOf
  // 3. 如果没有toPrimitive和valueOf 就会调用toString
  
  转number优先调用valueOf
  转string优先调用toString
  ```

- Boxing

  | 类型    | 对象                    | 值          |
  | ------- | ----------------------- | ----------- |
  | Number  | new Number(1)           | 1           |
  | String  | new String("a")         | "a"         |
  | Boolean | new Boolean(true)       | true        |
  | Symbol  | new Object(Symbol("a")) | Symbol("a") |

  ```javascript
  完成 StringToNumber 和 NumberToString 两个函数
  ```