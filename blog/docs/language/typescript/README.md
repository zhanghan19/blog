# 开启Typescript

## 场景类型

- 场景一：你调用一个别人写的函数，但是很不幸 这个家伙没有留下任何注释为了搞清楚参数类型 你只能硬着头皮去看里面的逻辑

- 场景二：为了保证代码的健壮性 你很有责任心 对一个函数的输入参数进行各种假设 最终给老板呈上了一碗香喷喷的意大利面

- 场景三：领导看好你 让你维护一个重要的底层类库 你殚精竭虑 优化了一个参数类型 但是不知道有多少处引用 在提交代码前是否感到脊背发凉

- 场景四：明明定义好了接口 可一联调就报错了`TypeError: Cannot read properity 'length' of undefined`于是你怒气冲冲的找后端理论 嘿哥们 这个字段是数组 这个字段是数组

以上情况归根结底是因为Javascript 是一门动态弱类型语言 对变量的类型非常宽容 而且不会再这些变量和他们的调用者间建立结构化的契约

## TypeScript
拥有类型系统的Javascript 的超级

- 类型检查

TypeScript 在编译代码时会进行严格的静态类型检查，这意味着你在编码阶段 发现可能存在的隐患 而不必把他们带到线上去

- 语言扩展

TypeScript 会包括来自ECMAScript 6 和未来提案中的特性比如异步操作和装饰器 也会从其它语言借鉴某些特性比如接口和抽象类

- 工具属性

TypeScript 可以编写成标准的Javascript 可以在任何浏览器中运行 操作系统上运行 无需任何运行时的额外开销 从这个角度上讲TypeScript 更像是一个工具 而不是一门独立的语言


## 强类型与弱类型


## 动态类型与静态类型

- **静态类型语言**：在编译阶段确定所有变量的类型

- **动态类型语言**：在执行阶段确定所有变量的类型

- Javascript

```js
// Javascript
class C {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

function add(a, b) {
	return a.x + a.y + b.x + b.y;
}

// 在程序运行时，动态计算属性偏移量
// 需要额外的空间存储姓名
// 所有对象的偏移量信息各存一份
```
- C++

```c
class C {
	public:
		int x;
		int y;
}

int add(C a, C b) {
	return a.x + a.y + b.x + b.y;
}

// 编译阶段确定属性偏移量
// 用偏移量访问代替属性名访问
// 偏移量信息共享
```

|静态类型语言| 动态类型语言|
|----|----|
|对类型极度严格| 对类型非常宽松|
|立即发现错误| Bug 可能隐藏数月甚至数年|
|运行时性能好| 运行时性能差|
自文档化| 可读性差|

动态类型语言的支持者认为：

- 性能时可以改善的（V8引擎），而语言的灵活性更重要

- 隐藏的错误可以通过单元测试发现

- 文档可以通过工具生成

## 总结
![rUWznK.png](https://s3.ax1x.com/2020/12/20/rUWznK.png)
