

# 1. JS语言通识

## 泛用语言分类方法
- 语言按语法分类

  - 非形式语言
    - 语法没有严格的定义例如：中文、英文
  - 形式语言（乔姆斯基谱系）
    - 0型 无限制文法
    - 1型 上下文相关文法
    - 2型 上下文无关文法
    - 3型 正则文法
## 什么是产生式
- 产生式

  - 用尖括号括起来的名称来表示语法 结构名
  - 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    - 基础结构称终结符
    - 复合结构称非终结符
  - 引号和中间的字符表示终结符
  - 可以有括号
  - *表示重复多次
  - |表示或
  - +表示至少一次
  - 问题
    - 产生式还是很模糊
    - 产生式表示四则运算

## 深入理解产生式

  - 0型 无限制文法
	```javascript
		- ?::?
	```
  - 1型 上下文相关文法
	```javascript
		- ?<A>?::=?<B>?
	```
  - 2型 上下文无关文法
	```javascript
		- <A>::=?
	```
  - 3型 正则文法
	```javascript
		- <A>::=<A>?
		- <A>::=?<A>
	```
  - 其他产生式

    - EBNF ABNF Customized

    - javascript产生式语法

      ```javascript
      AdditiveExpression:
      	MultiplicativeExpression
          AdditiveExpression +
      MultiplicativeExpression
      	AdditiveExpression -
      	MultiplicativeExpression
      
      
      
      // 带括号的四则运算产生式
      <Expression> ::= 
          <AdditiveExpression><EOF>
          
      <AdditiveExpression> ::= 
          <MultiplicativeExpression>
          |<AdditiveExpression><+><MultiplicativeExpression>
          |<AdditiveExpression><-><MultiplicativeExpression>
          
      <MultiplicativeExpression> ::= 
          <Number>
          |<MultiplicativeExpression><*><Number>
          |<MultiplicativeExpression></><Number>
      	|(<AdditiveExpression>)
      
      <Number> = 有理数
      ```

## 现代语言的分类

  - C++中，*可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型
  - VB中，< 可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
  - Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
  - javascript中/可能是除号，也可能是正则表达开头，处理方式类似于VB，字符串模板中也需要特殊处理}，还有自动插入分号规则
  - 现代语言分类
    - 形式语言--用途
      - 数据描述语言
        - JSON HTML XAML SQL CSS
      - 编程语言
        - C C++ java c#, python, Ruby, Perl, Lisp, T-SQL, Clojure, Haskell, javascript
    - 形式语言 --表达方式
      - 声明式语言：告诉你结果是怎样的
        - JSON , HTML , XAML , SQL , CSS , Lisp， Clojure，Haskell
      - 命令型语言：达成结果的过程是怎样的
        - C C++ java c#, python, Ruby, Perl,  javascript
    - 练习：
      - 给你所知道的语言类型分类 

## 编程语言的性质

  - 图灵完备性

    ```javascript
    不直观的抽象描述：和图灵机完全等效的就是图灵完备 
    直观的描述：就是所有的可计算的问题都可用来描述的这样的语言就是具备图灵完备性的
    ```

    

    - 命令式----图灵机
      - goto
      - if和while
    - 声明式----lambda
      - 递归

  - 动态与静态

    - 动态

      ```javascript
      实在用户的设备上运行或者在线的服务器上运行的
      ```

      - 在用户的设备/在线的服务器上
      - 产品实际运行时
      - Runtime

    - 静态

      - 在程序员的设备上
      - 产品开发时
      - Compiletime

  - 类型系统

    - 动态类型系统与静态类型系统
    - 强类型系统与弱类型
      - String + Number
      - String == Boolean
    - 复合类型
      - 结构体
      - 函数签名
    - 子类型
    - 泛型
      - 逆变/协变

## 一般命令式编程语言的设计方式

  - Atom(关键字，直接量，变量名)
    - Identifier
    - Literal
  - Expression：原子级的这些结构通过运算符相连接加上一些辅助的符号
    - Atom
    - Operator
    - Punctuator
  - Statement：表达式加上特定的标识符和一些特定的关键字和符号形成一定的结构我们称之为语句
    - Expresion
    - Keyword
    - Punctuator
  - Structure：结构化帮助我们组织代码，把代码分成不同的块，达到分成不同的复用结构
    - Function
    - Class
    - Process
    - Namespace
  - Program：组织代码
    - Program
    - Module 
    - Package
    - Library

