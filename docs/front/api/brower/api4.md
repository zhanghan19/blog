# CSSOM

- document.styleSheets
	- Rules
	```javascript
	document.styleSheets[0].cssRules
	document.styleSheets[0].insertRule("p {color: pink;}", 0)
	document.styleSheets[0].removeRule(0)
	```
	- Rule
		- CSSStyleRule
		- CSSCharsetRule
		- CSSImportRule
		- CSSMediaRule
		- CSSFontFaceRule
		- CSSPageRule
		- CSSNamespaceRule
		- CSSKeyframesRule
		- CSSKeyframeRule
		- CSSSupportsRule
	- CSSStyleRule
		- selectorText String
		- style K-V结构

::: tip cssom使用场景
改变伪元素的样式是没有办法通过 DOM API 直接去访问的
就不许通过cssom 去修改为元素的表现
:::

- window.getComputedStyle(elt, pseudoElt);
	- elt 想要获取的元素
	- pseudoElt可选，伪元素

::: tip getComputedStyle使用场景
他能取到我们页面上的元素，最终真实渲染的时候，所需要的CSS属性。然后，同时他也能够访问到尾元素上。这是一个非常强大的能力。

这里我们有一个非常好的实践：
我们可以通过getComputedStyle 获取一些元素，比如transform，比如说元素到，我们要去做拖拽。这样的行为，我们最好都用的getComputedStyle。还有，我们有一些CSS动画

它有一些中间态，我们可能想要暂停这个动画。这个时候呢，我们没有办法通过DOM API。style属性和 CSSRules 去判断当前播到那了。因为他是因为他是一个中间。这个时候，我们也会使用get computer的style

:::