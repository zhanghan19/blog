# 4.收集标准
## 找出 W3C 标准中的 CSS 属性

 我们知道 CSS2.1 是一份标准，但是 CSS3 分布在无数标准中，我们需要用代码把它们整理出来，这就是我们今天的小实验内容了。

 为了达到我们的目的，我们需要写一个简单的爬虫，来找一找 W3C 标准中都覆盖了哪些属性。

**我们这个爬虫的思路是：用 iframe 来加载所有标准的网页，然后用 JavaScript 找出它们中间定义的属性。**

- 第一步：找到 CSS 相关的标准。

	[https://www.w3.org/TR/?tag=css](https://www.w3.org/TR/?tag=css)

我们必须从这个页面里抓取所有的标准名称和链接，打开它的代码，我们会发现它是有规律的，这个页面由一个巨大的列表构成，我们只需要根据 tag 选取需要的标准即可。
```javascript
document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)")
```
这段代码可以找到所有 CSS 相关的标准，我们用代码把从 HTML 结构中把它们抽取出来。可以得到一个列表。

<img :src="$withBase('/images/cssstd.png')" alt="css标准">

- 第二步：分析每个标准中的 CSS 属性

得到了这个标准的列表，下一步我们就是分析每个标准中的 CSS 属性。

我们打开第一个标准，试着找出属性定义：
[https://www.w3.org/TR/2019/WD-css-lists-3-20190425/](https://www.w3.org/TR/2019/WD-css-lists-3-20190425/)

经过分析，我们会发现，属性总是在一个具有 propdef 的容器中，有属性 data-dfn-type 值为 property。

这里我不得不感慨，W3C 的标准写得真的是十分严谨，这给我们带来了很大的方便。我们用以下代码获取属性：
```javascript
document.querySelectorAll(".propdef [data-dfn-type=property]")
```

对于第一个标准 CSS Lists Module Level 3 得到了这个列表：

```javascript
list-style-image
list-style-type
list-style-position
list-style
marker-side
counter-reset
counter-set
counter-increment
```
好了，接下来，我们来用 iframe 打开这些标准，并且用我们分析好的规则，来找出里面的属性就可以了。最终成品代码如下：
```javascript
var iframe = document.createElement("iframe");

document.body.appendChild(iframe);

iframe.src = "https://www.w3.org/TR/2019/WD-css-lists-3-20190425/"

function happen(element, type){
  return new Promise(resolve => {
    element.addEventListener(type, resolve, {once: true})
  })
}

happen(iframe, "load").then(function(){
  //Array.prototype.map.call(document.querySelectorAll("#container li[data-tag~=css] h2"), e=> e.children[0].href + " |\t" + e.children[0].textContent).join("\n")
  console.log(iframe.contentWindow);
})
async function start(){
  var output = []
  for(let standard of  Array.prototype.slice.call(document.querySelectorAll("#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)"))) {
    console.log(standard.children[0].href);
    iframe.src = standard.children[0].href;
    await happen(iframe, "load");
    var properties = Array.prototype.map.call(iframe.contentWindow.document.querySelectorAll(".propdef [data-dfn-type=property]"), e => e.childNodes[0].textContent);
    if(properties.length)
        output.push(standard.children[0].textContent + " | " + properties.join(", "));
  }
  console.log(output.join("\n"))
}
start();
```

这样，我们就得到了每个属性属于哪个标准，我们来看看最终结果。我把它整理成了一个列表。

<ME-img url="/images/cssstd2.jpg"/>

至此，我们已经找出了标准中讲解的所有属性。
