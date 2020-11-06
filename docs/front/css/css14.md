# 14. BFC合并
## Block

- Block Container：里面有BFC的
  - 能容纳正常流的盒，里面就有BFC，想想有哪些？ 
- Block-level Box：外面有BFC的 
- Block Box = Block Container + Block-level Box：里外都有BFC的
## Block Container

- block
- inline-block
- table-cell
- flex item
- grid cell
- table-caption

## Block-level Box

| Block level      | Inline level            |
| ---------------- | ----------------------- |
| • display:block  | • display: inline-block |
| • display: flex  | • display: inline-flex  |
| • display: table | • display: inline-table |
| • display: grid  | • display: inline-grid  |
| • ......         | • ......                |

## 设立BFC

- floats
- absolutely positioned elements
- block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes,
  - flex items
  - grid cell
  - ......
- and block boxes with 'overflow' other than 'visible'

## BFC合并

- block box && overflow:visible
- BFC合并与float
```html
<body style="height: 500px;background-color: lightgreen;">
	<div style="float:right;width:100px;height:100px;background:aqua;margin:20px;">
	</div>

	<div style="background-color: pink;overflow: visible;margin: 30px;">
	<!-- <div style="background-color: pink;overflow: hidden;margin: 30px;"> -->
		文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
		字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
		文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文
		字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
		文字文字文字文字文字文字文字文字
	</div>
</body>
```
- BFC合并与边距折叠

```html
<div style="width: 100px; height: 100px;background-color: aqua; margin: 20px;">
</div>
<!-- <div style="overflow: hidden;background-color: pink;"> -->
<div style="overflow: visible;background-color: pink;">
	<div style="width: 100px; height: 100px;background-color: aqua;margin: 20px;">
	</div>
</div>
```