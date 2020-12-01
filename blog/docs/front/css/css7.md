# 7. 选择器的优先级

选择器的优先级CSS 

标准用一个三元组 (a, b, c) 来构成一个复杂选择器的优先级。

- id 选择器的数目记为 a；
- 伪类选择器和 class 选择器的数目记为 b；
- 伪元素选择器和标签选择器数目记为 c；
- “*” 不影响优先级。

CSS 标准建议用一个足够大的进制，获取“ a-b-c ”来表示选择器优先级。

即：
```javascript
specificity = base * base * a + base * b + c
```
其中，base 是一个“足够大”的正整数。关于 base，历史中有些趣闻，早年 IE6 采用 256 进制，于是就产生“256 个 class 优先级等于一个 id”这样的奇葩问题，后来扩大到 65536，基本避免了类似的问题。

现代浏览器多采用了更大的数量，我们正常编写的 CSS 规则数量不太可能达到数万，因此我们可以认为这样的 base 就足够大了。

行内属性的优先级永远高于 CSS 规则，浏览器提供了一个“口子”，就是在选择器前加上“!import”。

这个用法非常危险，因为它相当于一个新的优先级，而且此优先级会高于行内属性。

同一优先级的选择器遵循“后面的覆盖前面的”原则，我们可以看一个例子：
```html
<div id="my" class="x y">text<div>
```

```css
.x { 
	background-color:lightblue;
}
.y { 
	background-color:lightgreen;
}
```
调换“.x”和“.y”我们可以得到不同的显示效果。选择器的优先级是针对单条规则的，多条规则的选择器同时命中元素，优先级不会发生叠加。

```html
<div id="my" class="x y z">text<div>
```

```css
.x {
    background-color:lightblue;
}
.z {
    background-color:lightblue;
}
.y {
    background-color:lightgreen;
}
```
在这个例子中，“.x ”和“.z ”都指定了背景色为浅蓝色，但是因为“.y ”规则在最后，所以最终显示结果为浅绿色。另外一个需要注意的是，选择器的优先级是针对复杂选择器的优先级，选择器列表不会合并计算优先级。

我们看一个例子：

```html
<div id="my" class="x y z">text<div>
```

```css
.x, .z {
    background-color:lightblue;
}
.y {
    background-color:lightgreen;
}
```
这里选择器列表“ .x, .z”命中了 div，但是它的两项分别计算优先级，所以最终优先级仍跟“ .y” 规则相同。

以上就是选择器优先级的相关规则了，虽然我们这里介绍了详细的计算方式，但是我认为选择器的使用上，如果产生复杂的优先级计算，代码的可读性一定是有问题的。

所以实践中，建议你“根据 id 选单个元素”“class 和 class 的组合选成组元素”“tag 选择器确定页面风格”这样的简单原则来使用选择器，不要搞出过于复杂的选择器。

- 简单选择器计数
```javascript
	  1       2
	#id div.a#id {					[0, 2, 1, 1]
	//......
	}   							S = 0 * N³+ 2 * N²+ 1 * N¹+ 1 
									取N = 1000000
									S = 2000001000001
```

- 练习
- 做一组练习
请写出下面选择器的优先级
```javascript
 div#a.b .c[id=x]  //0 1 3 1 
 
 #a:not(#b)  //0 2 0 0 
 
 *.a  //0 0 1 0 
 
 div.a  // 0 0 1 1
```