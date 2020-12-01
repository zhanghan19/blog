# 发布系统
## 实现一个线上 Web 服务 
准备一台服务器（这里以阿里云ECS为例系统为ubuntu）
- 安装node npm
```shell
sudo apt install nodejs

sudo apt install npm

# node 升级

npm install n -g

# 安装稳定版本
sudo n stable

# 安装最新版本
sudo n latest

# 配置全局变量
PATH="PATH"
```

- 使用express-generator搭建服务器

```shell
npx express-generator

安装依赖
npm install

启动
npm start
```

- 在服务器中创建文件夹

```shell
mkdir /home/zh/root/server
```

- 把代码传到服务器

```shell
scp -P 22 -r ./* zh@47.114.45.109:/home/zh/root/server
```

- 在服务其中添加配置规则
![](/images/aliyunprot.png)

- 运行 npm start

## 用node启动一个简单的服务器

- 创建文件夹

```shell
mkdir publish-server
```

- 初始化项目

```shell
npm init
```

- 新建server.js文件

```js
let htttp = require("http");

http.createServer(function(request, response) {
  console.log(request)
  res.end("hello world");
}).listen(3001);

```
- 启动 node server.js


## 编写简单的发送请求功能

- 创建文件夹

```shell
mkdir publish-tool
```

- 初始化项目

```shell
npm init
```

- 新建publish.js文件
```js
let http = require("http")

let request = http.request({
	hostname: "127.0.0.1",
	port: 3001
}, response => {
	console.log(response)
})

request.end();
```

## 用http协议发送文件
- 在publish-tool中添加sampel.html文件
```html
<h1>hello world</h1>
```
- 将上面的publish.js改为

```js 
let http = require('http');

let fs = require('fs');

let request = http.request({
  // hostname: '47.114.45.109',
  hostname: '127.0.0.1',
  port: 3001,
  method: "POST",
  headers: {
    'Content-Type': 'application/octet-stream'
  }
}, response => {
  console.log(response)
})

let file = fs.createReadStream("./sampel.html")

file.on('data', chunk => {
	console.log(chunk.toString());
	request.write(chunk)
})

file.on('end', chunk => {
	console.log("read finished")
	request.end(chunk)
})

```
- 将上面的server.js改为
```js
let htttp = require("http");
let fs = require('fs');

http.createServer(function(request, response) {
  console.log(request.headers)
  let outFile = fs.createWtiteStream("../server/public/index.html");
  request.on('data', chunk => {
	  outFile.write(chunk);
  })
  request.on('end', () => {
	  response.end("Success");
  })
  
}).listen(3001);

```
- 添加部署

publish-server/package.json

```js
{
  "name": "publish-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node ./server.js",
    "publish": "scp -r -P 22 ./* zh@47.114.45.109:/home/zh/root/publish-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
  }
}
```

运行npm publish 为发布
运行npm start 为启动

## 实现多文件发布

- 压缩包[archiver](https://www.npmjs.com/package/archiver)
- 解压缩[unzipper](https://www.npmjs.com/package/unzipper)

- 修改publish.js 并安装依赖

```js
let http = require('http')
let fs = require('fs')
let archiver = require('archiver')


let request = http.request({
  // hostname: '47.114.45.109',
  hostname: '127.0.0.1',
  port: 3001,
  method: "POST",
  headers: {
    'Content-Type': 'application/octet-stream'
    // ,
    // "Content-Length": stats.size
  }
}, response => {
  console.log(response)
})

// let file = fs.createReadStream('./sample.html')

const archive = archiver('zip', {
  zlib: {level: 9}
});

archive.directory('./sample/', false);

archive.finalize();

archive.pipe(request)

```

- 修改server.js 并安装依赖

```js
let http = require('http');
let fs = require('fs');
let unzipper = require('unzipper')

http.createServer(function(request, response) {
  // let outFile = fs.createWriteStream('../server/public/tmp.zip')
  // request.pipe(outFile)
  request.pipe(unzipper.Extract({path: '../server/public/'}));
}).listen(3001);

```

## 用GitHub oAuth做一个登录实例

- 新建github App

点击头像 --> Settings --> Developer settings --> New GitHub App

只需填写如下，其他都不用写

GitHub App name --> Homepage URL --> User authorization callback URL --> Any account

[github文档](https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps)

### 流程

![](/images/oauth.png)

**1 打开 https://github.com/login/oauth/authorize**

:::warning 注意
mac使用open 

child_process.exec(`open https://www.baidu.com/`)

window使用start 

child_process.exec(`start https://www.baidu.com/`)
:::right
[推荐](https://stackoverflow.com/questions/38147620/shell-script-to-open-a-url)
:::

**2 auth 路由：接受code，用code+client_id + client_secret换token**

**3 创建server, 接受token吗，后点击发布**

**4 publish 路由：用token获取用户信息，检查全限，接受发布**

- server修改
```js
let http = require('http');
let https = require('https');
let unzipper = require('unzipper')
let querystring = require('querystring')

// 2 auth 路由：接受code，用code+client_id + client_secret换token
function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  console.log(query)
  getToken(query.code, function(info) {
    console.log(info)
    // response.write(JSON.stringify(info))
    response.write(`<a href="http://localhost:3002?token=${info.access_token}">publish</a>`)
    response.end();
  })
}

function getToken(code, callback) {
  let request = https.request({
    hostname: "github.com",
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.f1ef0ae6f95002ea&client_secret=fbb82b78a095473702f3192165086f0eb1e80339`,
    port: 443,
    method: "POST"
  }, function(response) {
    let body = ""
    response.on('data', chunk => {
      body += chunk.toString()
    })
    
    response.on('end', chunk => {
      console.log(body)
      callback(querystring.parse(body))
    })

  })
 

  request.end();
}

// 4 publish 路由：用token获取用户信息，检查全限，接受发布
function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
  getUser(query.token, info => {
    if(info.login === "zhanghan19"){
      request.pipe(unzipper.Extract({path: '../server/public/'}));
      response.on('end', function() {
        response.end("success!")
      })
    }
  })
 
}

function getUser(token, callback) {
  let request = https.request({
    hostname: "api.github.com",
    path: `/user`,
    port: 443,
    method: "GET",
    headers: {
      "Authorization": `token ${token}`,
      "User-Agent": "zhanghan19"
    }
  }, function(response) {
    let body = ""
    response.on('data', chunk => {
      body += chunk.toString()
    })
    
    response.on('end', chunk => {
      callback(JSON.parse(body))
    })

  })
  request.end();
}

http.createServer(function(request, response) {
  if(request.url.match(/^\/auth\?/))
    return auth(request, response)
  if(request.url.match(/^\/publish\?/))
    return publish(request, response)
  // let outFile = fs.createWriteStream('../server/public/tmp.zip')
  // request.pipe(outFile)
  // request.pipe(unzipper.Extract({path: '../server/public/'}));
}).listen(3001);
```

- publish修改

```js
let http = require('http')
let fs = require('fs')
let archiver = require('archiver')
let child_process = require('child_process')
let querystring = require("querystring")

// 1 打开 https://github.com/login/oauth/authorize
child_process.exec(`start https://github.com/login/oauth/authorize?client_id=Iv1.f1ef0ae6f95002ea`)

// 3 创建server, 接受token吗，后点击发布
http.createServer(function(request, response) {
 let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1])
 publish(query.token)
}).listen(3002);

function publish(token) {
  let request = http.request({
    // hostname: '47.114.45.109',
    hostname: '127.0.0.1',
    port: 3001,
    method: "POST",
    path: "/publish?token=" + token,
    headers: {
      'Content-Type': 'application/octet-stream'
      // ,
      // "Content-Length": stats.size
    }
  }, response => {
    console.log(response)
  })
  
  // let file = fs.createReadStream('./sample.html')
  
  const archive = archiver('zip', {
    zlib: {level: 9}
  });
  
  archive.directory('./sample/', false);
  
  archive.finalize();
  
  archive.pipe(request)
}
```