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
	- window.getComputedStyle(elt, pseudoElt);
		- elt 想要获取的元素
		- pseudoElt可选，伪元素