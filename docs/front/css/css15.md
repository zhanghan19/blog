# 15. Flex排版

## Flex排版

- 收集**盒**进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布

## 分行

- 根据主轴尺寸，把元素分进行
- 若设置了no-wrap，则强行分配进第一行

![分行](/images/flex1.png)

## 计算主轴方向
- 找出所有Flex元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

![计算主轴方向](/images/flex2.png)

## Flex规则解析

### 声明定义
容器盒子里面包含着容器元素，使用 display:flex 或 display:inline-flex 声明为弹性盒子。
### flex-direction
::: theorem 用于控制盒子元素排列的方向
一个弹性盒子中的每一项的排版方式有两种横排和竖排，那么横排和竖排的顺序又分正序和倒叙，所以弹性盒子中的每一项有四种排版方式
:::

|值		|描述							|
| ---- | ---- | 
|row			|从左到右水平排列元素（默认值）<font color="#ff0000">主轴就是水平方向</font>|
|row-reverse	|从右向左排列元素				|
|column			|从上到下垂直排列元素			<font color="#ff0000">主轴就是垂直方向</font>|
|column-reverse	|从下到上垂直排列元素			|

### flex-wrap
::: theorem 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。
一个弹性盒子中的每一项是横向排布，如果一行排不下，这时分三种情况： 第一等比缩放（默认）， 第二折行 ，第三 硬刚（超出就超出）
:::

|选项	|说明												|
| ---- | ---- | 
|nowrap		  |元素不拆行或不拆列（默认值）					|
|wrap		  |容器元素在必要的时候拆行或拆列。				|
|wrap-reverse |容器元素在必要的时候拆行或拆列，但是以相反的顺序	|

::: theorem 主轴
flex-direction: row;  主轴就是水平方向

flex-direction: column;  主轴就是垂直方向
:::

### justify-content
::: theorem 主轴的排列方式
用于控制元素在主轴上的排列方式，再次强调是主轴的排列方式。
:::
|选项			|说明																		|
| ---- | ---- | 
|flex-start		|元素紧靠主轴起点															|
|flex-end		|元素紧靠主轴终点															|
|center			|元素从弹性容器中心开始														|
|space-between	|第一个元素靠起点，最后一个元素靠终点，余下元素平均分配空间					|
|space-around	|每个元素两侧的间隔相等。所以，元素之间的间隔比元素与容器的边距的间隔大一倍	|
|space-evenly	|元素间距离平均分配															|
### 交叉轴行
元素在交叉轴上有行的概念，理解这个概念会对理解align-items与align-content有更好的帮助。

- align-item是控制元素在行上的排列
- align-content是控制行在交差轴上的排列
### align-items
::: theorem 交叉轴的排列方式
用于控制容器元素在交叉轴上的排列方式。
:::

|选项		|说明							|
| ---- | ---- | 
|stretch	|元素被拉伸以适应容器（默认值）	|
|center		|元素位于容器的中心				|
|flex-start	|元素位于容器的交叉轴开头		|
|flex-end	|元素位于容器的交叉轴结尾		|

::: warning 注意
如果设置了 width | height | min-height | min-width | max-width | max-height ，将影响stretch 的结果，因为 stretch 优先级你于宽高设置。
:::

### align-content
::: theorem 多行时交叉轴的排列方式
只适用于多行显示的弹性容器，用于控制行（而不是元素）在交叉轴上的排列方式。
:::
### 弹性元素
放在容器盒子中的元素即为容器元素。

- 不能使用float与clear规则
- 弹性元素均为块元素
- 绝对定位的弹性元素不参与弹性布局
### align-self

::: theorem 单个盒子交叉轴的排列方式
用于控制单个元素在交叉轴上的排列方式，align-items 用于控制容器中所有元素的排列，而 align-self 用于控制一个弹性元素的交叉轴排列。
:::

|选项		|说明					|
| ---- | ---- | 
|stretch	|将空间平均分配给元素	|
|flex-start	|元素紧靠主轴起点		|
|flex-end	|元素紧靠主轴终点		|
|center		|元素从弹性容器中心开始	|

### flex-grow
::: theorem 当主轴排列时有剩余的空间，那么此空间的分配方式如下
用于将弹性盒子的可用空间，分配给弹性元素。可以使用整数或小数声明。
:::
如果弹性元素设置了宽度，将把（弹性盒子-弹性元素宽度和）后按照 flex-grow 进行分配 。

### flex-shrink
::: theorem 当主轴排列时超出主轴的宽度没有剩余的空间时，那么子元素缩小的比例如何计算
与 flex-grow 相反 flex-shrink 是在弹性盒子装不下元素时定义的缩小值。
:::
下例在600宽的弹性盒子中放了 1000 宽的弹性元素。并为最后两个元素设置了缩放，最后一个元素的缩放比例为 500 -( ( (1000-600) / (100X1+400x3+500X6) ) x 3 ) X 500 = 220.9，计算公式说明如下：

```
缩小比例 = 不足的空间 / (元素 1 宽度 x 缩小比例) + (元素 2 宽度 x 缩小比例) ...
最终尺寸 = 元素三宽度 - (缩小比例 x  元素 3 的宽度) X 元素宽度
```

### flex-basis

::: theorem 主轴的基本尺寸
flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。
:::
可以是长度单位，也可以是百分比。flex-basis的优先级高于width、height属性。

- 优先级

min-width、min-height 优先级大于 flex-basis 优先级大于 width、height。


### flex

::: theorem 缩写
flex是flex-grow、flex-shrink 、flex-basis缩写组合。
:::

::: tip 提示
建议使用 flex 面不要单独使用 flex-grow / flew-shrink / flex-basis 。
:::

### order

::: theorem 改变元素的顺序
用于控制弹性元素的位置，默认为 order:0 数值越小越在前面，可以负数或整数。
:::

### 弹性文本
文本节点也在弹性布局操作范围内

### 绝对定位
绝对定位的弹性元素不参与弹性布局

### 自动空间

在弹性布局中对元素使用margin-right:auto 等形式可以自动撑满空间。下例为第一个ul设置 margin-right:auto 表示右侧空间自动撑满，第二个ul靠近父元素右边界。
## 推荐阅读
[See Also](https://houdunren.gitee.io/note/css/10%20%E5%BC%B9%E6%80%A7%E5%B8%83%E5%B1%80.html#%E4%BA%86%E8%A7%A3%E5%BC%B9%E6%80%A7)