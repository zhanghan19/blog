# HTTP请求

## HTTP的协议解析

### ISO-OSI七层网络模型

<mermaid>
graph LR
  id1["应用"]
  id2["表示"]
  id3["会话"]
  id4["传输"]
  id5["网络"]
  id6["数据链路"]
  id7["物理层"]
  id1 --> id2
  id2 --> id3
  id3 --> id4
  id4 --> id5
  id5 --> id6
  id6 --> id7
</mermaid>
<mermaid>
graph LR
  id8["HTTP"]
  id9["TCP"]
  id10["Internet"]
  id11["4G/5G/Wi-Fi"]
  id8 --> id9
  id9 --> id10
  id10 --> id11
</mermaid>

### TCP与IP的基础知识

| TCP            | IP             |
| -------------- | -------------- |
| 流             | 包             |
| 端口           | IP地址         |
| require('net') | libnet/libpcap |

### HTTP

- Request

```js
POST / HTTP/1.1
Host:127.0.0.1
Content-Type:application/x-www-form-urlencoded

field1=aaa&code=x%3D1
```



- Response

```js
HTTP/1.1 200 OK
Content-Type:text/html
Date:Mon,23 Dec 2019 06:25:19 GMT
Connection:keep-alive
Transfer-Encoding:chunked

26 // 下面内容的长度（十六进制）
<html><body> Hello World<body></html>
0 // 结束符（十六进制）

// body的格式由Content-Type决定
// 这里有一种典型的格式叫做 chunked body 这是node默认返回的这样的一种body的格式
```



## 服务端环境准备

```js
const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  let body = []
  req.on('error', (err) => {
      console.error(err);
  }).on('data', (chunk) => {
      body.push(chunk.toString())
  }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('body', body)
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end('helo world\n')
  })
})

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`)
})
```

[High Performance Browser Networking](https://book.douban.com/subject/25856314/)

## 实现一个HTTP的请求

```js
// 客户端
const net = require("net");

class Request {
    constructor(options) {
        this.method = options.method || "EGT";
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {

            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            
        })
    }

}

void async function () {
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "3000",
        path: "/",
        headers: {
            ["x-Foo2"]: "customed"
        },
        body: {
            name: "张寒",
            sex: "男"
        }
    });
    let response = await request.send();
    console.log(response);
    let dom = parser.parseHTML(response.body);
}();
```



### HTTP请求总结

- 设计一个HTTP请求的类
- content type 是一个必要的字段，要有默认值
- body是kv格式
- 不同的content-type 影响body的格式

## send函数的编写，了解response格式

```js
send(connection) {
    return new Promise((resolve, reject) => {
        const parser = new ResponseParser;
        resolve("");
    })
}

class ResponseParser {
    constructor() {
       
    }
    
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }

    receiveChar(char) {
        
    }
}
```



### 第二步 send函数总结

- 在Request的构造器中手机必要的信息
- 设计一个send函数，把请求真实发送到服务器
- send函数应该是异步的，所以返回Promise

## 发送请求

```js
const net = require("net");

class Request {
  constructor(options) {
    this.method = options.method || "EGT";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser;
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString());
        })
      }

      connection.on("data", (data) => {
        console.log(data.toString())
        // parser.receive(data.toString());
        // if (parser.isFinished) {
        //   resolve(parser.response);
        //   connection.end();
        // }
      });

      connection.on("error", (err) => {
        reject(err);
        connection.end();
      })

    })
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
  }
}

class ResponseParser {
  constructor() {
     
  }

  receive(string) {
      for (let i = 0; i < string.length; i++) {
          this.receiveChar(string.charAt(i));
      }
  }

  receiveChar(char) {
     
  }
}


void async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "3000",
    path: "/",
    headers: {
      ["x-Foo2"]: "customed"
    },
    body: {
      name: "张寒",
      sex: "男"
    }
  });
  let response = await request.send();
  console.log(response);
  let dom = parser.parseHTML(response.body);
}();
```



### 第三步发送请求总结

- 设计支持已有的connection或者自己新建connection
- 收到数据传给parser
- 根据parser的状态resolve Promise

## response解析

```js
HTTP/1.1 200 OK
Content-Type: text/html
Date: Sat, 31 Oct 2020 00:18:44 GMT
Connection: keep-alive
Transfer-Encoding: chunked

c
hello world

0

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === "\r") {
        this.current = this.WAITING_HEADER_BLOCK_END;
        // if (this.headers['Transfer-Encoding'] === 'chunked') {
        //   this.bodyParser = new TrunkedBodyParser();
        // }
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      console.log(char)
      // this.bodyParser.receiveChar(char)
    }
  }
}
```



### 第四步ResponseParser总结

- Response必须分段构造，所以我们要用一个ResponseParse来“装配”
- ResponseParser分段处理ResponseText,我们用状态机来分析文本的结构



## response body的解析

```js
class TrunkedBodyParser {
  constructor() {
      this.WAITING_LENGTH = 0;
      this.WAITING_LENGTH_LINE_END = 1;
      this.READING_TRUNK = 2;
      this.WAITING_NEW_LINE = 3;
      this.WAITING_NEW_LINE_END = 4;
      this.length = 0;
      this.content = [];
      this.isFinished = false;
      this.current = this.WAITING_LENGTH;
  }
  receiveChar(char) {
      if (this.current === this.WAITING_LENGTH) {
          if (char === '\r') {
              if (this.length === 0) {
                  this.isFinished = true;
              }
              this.current = this.WAITING_LENGTH_LINE_END;
          } else {
              this.length *= 16;  // length 是16进制 所以要乘以16（？？？？？？？不解）
              this.length += parseInt(char, 16);  // 字符转成16进制是何意
          }
      } else if (this.current === this.WAITING_LENGTH_LINE_END) {
          if (char === '\n') {
              this.current = this.READING_TRUNK;
          }
      } else if (this.current === this.READING_TRUNK) {
          this.content.push(char);
          this.length--;
          if (this.length === 0) {
              this.current = this.WAITING_NEW_LINE;
          }
      } else if (this.current === this.WAITING_NEW_LINE) {
          if (char === '\r') {
              this.current = this.WAITING_NEW_LINE_END;
          }
      } else if (this.current === this.WAITING_NEW_LINE_END) {
          if (char === '\n') {
              this.current = this.WAITING_LENGTH;
          }
      }
  }
}
```



### 第五步BodyParser总结

- Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题
- 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式

##  HTML解析

### HTML parse模块的文件拆分

```js
// 创建parser.js
module.exports.parseHTML = function parseHTML(html) {
    console.log(html)
}
```



### parse模块的文件拆分总结

- 为了方便文件管理，我们把parser单独拆到文件中
- parser接受HTML文本作为参数，返回一颗DOM树

[HTML标准](html.spec.whatwg.org/multipage)

## 用FSM实现HTML的分析

```js
const EOF = Symbol("EOF");
function data(c) {
    
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for(let c of html) {
        state = state(c);
    }
    state = state(EOF)
}

```

### 用FSM实现HTML总结

- 我们用FSM来实现HTML的分析
- 在HTML标准中，已经规定了HTML的状态
- Toy-Browser只挑选其中一部分状态，完成一个最简版本

## 解析标签

```js


const EOF = Symbol("EOF");

function data(c) {
    if(c == "<") {
        return tagOpen;
    } else if(c == EOF) {
        return ;
    } else {
        return data;
    }
}

function tagOpen(c) {
    if(c =="/") {
        return endTagOpen;
    } else if(c.match(/^[a-zA-Z]$/)){
        return tagName(c);
    } else {
        return ;
    }
}

function endTagOpen(c) {
    if(c.match(/^[a-zA-Z]$/)) {
       return tagName(c);
    } else if(c == ">") {

    } else if(c == EOF) {

    } else {

    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName;
    } else if (c == ">") {
        return data;
    } else {
        return tagName;
    }
}
function beforeAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if ( c == ">") {
        return data;
    } else if (c == "=") {
        return beforeAttributeName;
    } else {
       return beforeAttributeName;
    }
}
function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;  // 
        return data;
    } else if (c == "EOF") {
       
    } else {
       
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for(let c of html) {
        state = state(c);
    }
    state = state(EOF)
}

```

### 解析标签总结

- 主要的标签有：开始标签，结束标签和自封闭标签
- 在这一步我们暂时忽略属性

## 创建元素

```js

let currentToken = null;
const EOF = Symbol("EOF");
function emit(token) {
  console.log(token)
}
function data(c) {
  if (c == "<") {
    return tagOpen;
  } else if (c == EOF) {
    emit({
      type: "EOF"
    })
    return;
  } else {
    emit({
      type: "text",
      content: c
    })
    return data;
  }
}

function tagOpen(c) {
  if (c == "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
  }
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
  }
    return tagName(c);
  } else if (c == ">") {

  } else if (c == EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName;
  } else if (c == ">") {
    return data;
  } else {
    return tagName;
  }
}
function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == ">") {
    return data;
  } else if (c == "=") {
    return beforeAttributeName;
  } else {
    return beforeAttributeName;
  }
}
function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;  // 
    return data;
  } else if (c == "EOF") {

  } else {

  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF)
}
```

### 创建元素总结

- 在状态机中，除了状态迁移，我们还会要加入业务逻辑
- 我们在标签结束状态提交标签token

## 处理属性

```js

let currentToken = null;
let currentAttribute = null;
const EOF = Symbol("EOF");
function emit(token) {
  console.log(token)
}
function data(c) {
  if (c == "<") {
    return tagOpen;
  } else if (c == EOF) {
    emit({
      type: "EOF"
    })
    return;
  } else {
    emit({
      type: "text",
      content: c
    })
    return data;
  }
}

function tagOpen(c) {
  if (c == "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: ""
    }
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: ""
    }
    return tagName(c);
  } else if (c == ">") {

  } else if (c == EOF) {

  } else {

  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName;
  } else if (c == ">") {
    return data;
  } else {
    return tagName;
  }
}
function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c);
  } else if (c == "=") {

  } else {
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c);
  }
}
function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;  // 
    return data;
  } else if (c == "EOF") {

  } else {

  }
}
function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c);
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == "\u0000") {

  } else if (c == "\"" || c == "'" || c == "<") {

  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return beforeAttributeValue;
  } else if (c == "\"") {
    return doubleQuotedAttributeValue;
  } else if (c == "\u0000") {
    return singleQuotedAttributeValue;
  } else if (c == "\"" || c == "'" || c == "<") {

  } else {

    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == "\"") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == "\u0000") {

  } else if (c == "EOF") {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c == "\'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == "\u0000") {

  } else if (c == "EOF") {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == "EOF") {

  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == "\u0000") {

  } else if (c == "EOF") {

  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}



function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: ""
    }
    return attributeName(c);
  }
}


module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF)
}
```

### 第五步总结

- 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
- 处理属性的方式跟标签类似
- 属性结束时，我们把属性加到标签Token上

## 用token构建DOM树

```js
function emit(token) {
  console.log(token)
  let top = stack[stack.length - 1];

  if (token.type == "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: []
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }

    top.children.push(element);
    element.parent = top;

    if (!token.isSelfClosing) {
      stack.push(element);
    }

    currentTextNode = null;
  } else if (token.type == "endTag") {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match!");
    } else {
      stack.pop();
    }
    currentTextNode = null;
  } 
}
```

### 第六步总结

- 从标签构建DOM树的基本技巧是使用栈
- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
- 自封闭节点可视为入栈后立刻出栈
- 任何元素的父元素是它入栈前的栈顶



## 将文本节点加到DOM树

```js
function emit(token) {
	let top = stack[stack.length - 1];
	if(token.type == "startTag") {
		let element = {
			type: "element",
			children: [],
			attributes: []
		};
		element.tagName = token.tagName;
		for(let p in token) {
			if(p != "type" && p != "tagName") {
				element.attributes.push({
					name: p,
					value: token[p]
				});
			}
		}
		top.children.push(element);
		element.parent = top;
		if(!token.isSelfClosing){
			stack.push(element);
		}
		currentTextNode = null;
	} else if(token.type == "endTag") {
		if(top.tagName != token.tagName) {
			throw new Error("Tag start end doesn't match!");
		} else {
			stack.pop();
		}
		currentTextNode = null;
	} else if(token.type === "text"){
		if(currentTextNode == null) {
			currentTextNode = {
				type: "text",
				content: ""
			}
			top.children.push(currentTextNode);
		}
		currentTextNode.content += token.content;
	}
}
```



### 第七部总结

- 文本节点与自封闭标签处理类似
- 多个问本节点需要合并