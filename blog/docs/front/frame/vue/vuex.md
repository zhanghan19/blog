# vuex 状态管理 


## 组件之间共享数据的方式

- 父向子传值：**v-bind** 属性绑定
- 子向父传值：**v-on** 事件绑定
- 兄弟组件之间共享数据：**EventBus**
```js
$on 接受数据的哪个组件

$emit发送数据的那个组件
```

## Vuex 是什么

::: theorem Vuex
Vuex 是实现组件全局状态（数据） 管理的一种机制， 可以方便的实现组件之间数据的共享。

- 能够再**vuex**中集中管理共享的数据，易于开发和后期维护
- 能够高效的实现组件之间的数据共享， 提高开发效率
- 存储再**vuex**中的数据都是响应式的，能够实时保持数据与页面的同步
:::

## 什么样的数据适合存储到**Vuex**中

一般情况下，只有组件之间共享的数据看，才有必要存储到vuex中；对于组件中的私有数据，依旧存储再组件自身的data中即可。

## 使用Vuex同一管理状态的好处

1 能够在 vuex 中集中管理共享的数据，易于开发和后期维护

2 能够高效的实现组件之间的数据共享，提高开发效率

3 存储在vuex 中的数据都是响应式的，能够实时保持数据与页面的同步

## Vuex 的基本使用

- 1 安装
```shell
npm install vuex --save
```
- 2 导入

```js
import vuex from 'vuex';
Vue.use(Vuex)
```

- 3 创建store对象

```js
const store = new Vuex.Store({
	// state 中存放的就是全局共享的数据
	state: { count: 0 }
})
```

- 4 将store对象挂载到vue 实例中

```js
new Vue({
	el: "#app",
	render: h => h(app),
	router,
	// 将创建的共享数据对象，挂载到Vue实例中
	// 所有的组件，就可以直接从 store 中获取全局的数据了
	store
})

```
## Vuex 的核心概念



### State

::: theorem State
State 提供唯一的公共数据源，所有共享的数据都要统一放到**Store**的**State**中进行存储。
:::

创建store 数据源，提供唯一公共数据

```js
const store = new Vuex.Store({
	state: {count: 0}
})
```
组件访问State中数据的第一种方式：

```js
this.$store.state.全局数据名称
```

组件访问State中数据的第二种方式：

```js
// 1. 从vuex 中按需导入 mapState 函数
import { mapState } from "vuex"
```
通过导入的mapState函数，将当前组件需要的全局数据，映射为当前组件的computed计算属性：

```js
// 2. 将全局数据，映射为当前数组的计算属性
computed: {
	...mapState(['count'])
}
```

### Mutation

::: theorem Mutation
Mutation 用于变更Store中的数据

1 只能通过mutation 变更Store数据，不可以直接操作 Store 中的数据

2 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化
:::
<font color="#3eaf7c">
触发mutations的第一种方式： this.$store.commit()
</font>

```js
// 定义 Mutation
const store = new vuex.store({
	state: {
		count: 0
	},
	mutations: {
		add(state) {
			// 变更状态
			state.count ++
		}
	}
})

// 触发mutation
methods: {
	handle1() {
		// 触发 mutations 的第一种方式
		this.$store.commit('add')
	}
}
```

```js
// 定义 Mutation
const store = new vuex.store({
	state: {
		count: 0
	},
	mutations: {
		add(state, step) {
			// 变更状态
			state.count += step
		}
	}
})

// 触发mutation
methods: {
	handle1() {
		// 触发 mutations 的第一种方式
		this.$store.commit('add', 3)
	}
}
```

<font color="#3eaf7c">
触发mutations的第二种方式：
</font>

```js
// 1. 从 vuex 中按需导入 mapMutations 函数
import { mapMutations } from "vuex"
```

通过刚才导入的mapMutations 函数，将需要的mutations 函数，映射为当前组件的methods方法：

```js
// 2 将指定的 mutations 函数， 映射为当前组件的methods 函数
methods: {
	...mapMutations(["add", "addN"]),
	handle() {
		// this.add("参数")
		this.add()
	}
}
```


::: danger 警告
在 mutation 中不能写异步的代码
:::

### Action

::: theorem Action
Action 用于处理异步任务

如果通过异步操作变更数据，必须通过Action，而不能使用Mutation，但是在Action中还是要通过触发Mutation的方式间接变更数据。
:::

```js
// 定义 Action
const store = new Vuex.Store({
	// ...省略其他代码
	mutations: {
		add(state) {
			state.count++
		}
	},
	actions: {
		addAsync(context) {
			setTimout(() => {
				context.commit('add')
			},1000)
		}
	}
})


// 触发 Action
methods: {
	handle() {
		// 触发 actions 的第一中方式
		this.$store.dispatch('addAsync')
	}
}

```

触发 actions 异步任务时携带参数：

```js
// 定义 Action
const store = new Vuex.Store({
	// ...省略其他代码
	mutations: {
		add(state, step) {
			state.count += step
		},
	},
	actions: {
		addAsync(context, step) {
			setTimout(() => {
				context.commit('add', step)
			},1000)
		}
	}
})

// 触发 Action
methods: {
	handle() {
		// 触发 actions 的第一种方式
		this.$store.dispatch('addAsync', 3)
	}
}
```
<font color="#3eaf7c">
触发Action的第二种方式：
</font>

```js
// 1 从 vuex 中按需导入 mapAction 函数
import { mapActions } from "vuex"
```

通过刚才导入的mapActions 函数，将需要的actions 函数，映射为当前组件的methods方法：

```js
methods: {
	...mapAction(['addAsync', 'addNAsync']),
	btnHandler() {
		this.addAsync()
	}
}

```

### Getter

::: theorem Getter
Getter 用于对 Store 中的数据进行加工处理形成新的数据。

1 Getter 可以对 Store 中已有的数据加工处理之后形成新的数据，类似Vue的计算属性。

2 Store 中数据发生变化，Getter 的数据也会跟着变化。
:::

```js
// 定义 Getter
const store = new Vuex.store({
	state: {
		count: 0
	},
	getters: {
		showNum: state => {
			return `当前最新的数量是${state.count}`
		}
	}
})
```

<font color="#3eaf7c">
使用getters的第一种方式：
</font>

```js
this.$store.getters.名称
```
<font color="#3eaf7c">
使用getters的第二种方式：
</font>

```js
import mapGetters from 'vuex'

computed: {
	...mapGetters(['showNum'])
}
```

