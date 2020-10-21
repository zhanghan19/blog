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
- BFC合并与边距折叠