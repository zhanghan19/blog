# CSSOM View

- window
	- window.innerHeight, window.innerWidth
	- windoe.outerWidth, window.outerHeight
	- window.deicePixelRatio
	- window.screen
		- window.screen.width
		- window.screen.height
		- window.screen.availWidth
		- window.screen.availHeight
	- window.open("about:blank", "blank", "width=100,height=100,right=100")
		- moveTo(x,y)
		- moveBy(x,y)
		- resizeTo(x,y)
		- resizeBy(x,y)

- scroll
	- scrollTop  // 元素滚动的高度
	- scrollLeft  // 元素横向滚动的长度
	- scrolWidth  // 元素滚动的最大宽度
	- scrollHeight  // 元素滚动的最大高度
	- scroll(x,y) // 滚动到指定位置
	- scrollBy(x,y)  // 在当前的基础上滚动一个差值
	- scrollIntoView() // 滚动到可视区

- widnow
	- scrollX
	- scrollY
	- scroll(x,y)
	- scrollBy(x,y)

- layout
	- getClientRects()  // 获取元素生成的盒
	- getBoundingClientRect() // 获取元素生成所有盒的包含区域