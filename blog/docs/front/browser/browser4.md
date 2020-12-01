
# CSS解析

## 第一步

- 遇到style标签时，我们把CSS规则保存起来
- 这里我们调用CSS Parser来分析CSS规则
- 这里我们必须要仔细研究此库分析CSS规则的格式

```js
const css = require('css');
let rules = []
function addCSSRules(text) {
  const ast = css.parse(text);
  fules.push(...ast.stylesheet.rules)
}

function emit(token) {

    let top = stack[stack.length - 1]

    if (token.type == "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: []
        }

        element.tagName = token.tagName

        for (let p in token) {
            if (p != "type" && p != "tagName") {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }

        top.children.push(element)
        element.parent = top

        if (!token.isSelfClosing)
            stack.push(element)

        // console.log('push', element)
        currentTextNode = null;
    } else if (token.type == "endTag") {
        if (top.tagName != token.tagName) {
            throw new Error("Tag start end doesn't match")
        } else {
            // console.log('pop', stack.pop())
            // 遇到style 标签时，执行添加 css 规则的操作
            if (top.tagName === "style") {
                addCSSRules(top.children[0].content)
            }
            layout(top);
            stack.pop()
        }
        currentTextNode = null;
    } else if (token.type == "text") {
        if (currentTextNode == null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}
```

## 第二步

- 当我们创建一个元素后，立即计算CSS
- 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
- 在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算的情况，这里我们忽略

## 第三步

- 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
- 我们从上一步骤的stack,可以获取本元素所有的父元素
- 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外

## 第四步

- 选择器也要从当前元素向外排列
- 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

## 第五步

- 根据选择器的类型和元素属性，计算是否与当前元素匹配
- 这里仅仅实现了三种基本选择器，实际的浏览器中要处理复合选择器
- 作业（可选）：实现复合选择器，实现支持空格的Class选择器

## 第六步

- 一旦选择匹配，就应用选择器到元素上，形成computedStyle

## 第七步

- specificity

```javascript
[   0    ,   0 ,     0  ,   0  ]
['inline', 'id', 'class', 'tag']
```

- CSS规则根据specificity和后来优先规则覆盖

- specificity是一个四元组，越在左边权重越高

- 一个CSS规则的specificity根据包含的简单选择器相加而成

## 第八步


<ME-img url="/images/browser/axis.jpg"/>

- width height left right top bottom属性给抽象成了main cross 相关的属性

## 第九步

- 分行
  - 根据主轴尺寸，把元素分进行
  - 若设置了no-wrap,则强行分配进第一行

## 第十步

- 计算主轴方向
  - 找出所有Flex元素
  - 把主轴方向的剩余尺寸按比例分配给这些元素
  - 若剩余空间为负数，所有flex元素为0，等比压缩剩余空间

## 第十一步

- 计算交叉轴方向
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高flex-align和item-align 确定元素具体位置

## 绘制

- 绘制需要依赖一个图形环境
- 我们这里采用了npm包images
- 绘制在一个viewport上进行
- 与绘制相关的属性：background-color、border、background-image等