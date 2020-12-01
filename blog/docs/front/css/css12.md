# 12. 正常流的行级排布


- Baseline
<img :src="$withBase('/images/baseline.png')" alt="Baseline">

- Text
<img :src="$withBase('/images/text.png')" alt="Text">

- 行模型
<img :src="$withBase('/images/linemodule.png')" alt="行模型">
CSS 的属性 vertical-align 用来指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式。

	```css
	/* Keyword values */
	vertical-align: baseline;
	vertical-align: sub;
	vertical-align: super;
	vertical-align: text-top;
	vertical-align: text-bottom;
	vertical-align: middle;
	vertical-align: top;
	vertical-align: bottom;
	
	/* <length> values */
	vertical-align: 10em;
	vertical-align: 4px;
	
	/* <percentage> values */
	vertical-align: 20%;
	
	/* Global values */
	vertical-align: inherit;
	vertical-align: initial;
	vertical-align: unset;
	
	```


[See Also](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)
