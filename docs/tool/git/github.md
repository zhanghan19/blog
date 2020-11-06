# github使用

## 结构图
![](/images/git/github.png)

## 6.1 创建仓库

(1)注册github账户，登录后，点击"New respository "

![](/images/git/github02.jpg)

(2)在新页面中，输入项目的名称，勾选'readme.md'，点击'create repository'

![](/images/git/github03.png)

(3)添加成功后，转到文件列表页面.

![](/images/git/github04.png)

## 6.2 添加ssh账户

(1) 点击账户头像后的下拉三角，选择'settings'

如果某台机器需要与github上的仓库交互，那么就要把这台机器的ssh公钥添加到这个github账户上

![](/images/git/github05.png)

点击'SSH and GPG keys'，添加ssh公钥。

![](/images/git/github06.png)

(2) 在ubuntu的命令行中，回到用户的主目录下，编辑文件.gitconfig，修改某台机器的git配置。

![](/images/git/github07.png)

(3) 修改为注册github时的邮箱，填写用户名。

![](/images/git/github08.png)

(4) 使用如下命令生成ssh密钥。

```shell
ssh-keygen -t rsa -C "邮箱地址"
```

![](/images/git/github09.png)

(5) 进入主目录下的.ssh文件件，下面有两个文件。

公钥为id_rsa.pub

私钥为id_rsa

查看公钥内容，复制此内容

![](/images/git/github10.png)


(6) 回到浏览器中，填写标题，粘贴公钥

![](/images/git/github11.png)

## 6.3 克隆项目

(1) 在浏览器中点击进入github首页，再进入项目仓库的页面

![](/images/git/github12.png)

(2) 复制git地址

![](/images/git/github13.png)

(3) 克隆出错

![](/images/git/github14.png)

(4) 在命令行中复制仓库中的内容

![](/images/git/github15.png)

## 6.4 上传分支

(1) 项目克隆到本地之后，执行如下命令创建分支smart.

![](/images/git/github16.png)

(2) 创建一个code.txt并提交一个版本。

![](/images/git/github17.png)

(3) 推送前github上文件列表如下图

![](/images/git/github18.png)

(4) 推送前github上分支列表如下图

![](/images/git/github19.png)

(5) 推送分支，就是把该分支上的所有本地提交推送到远程库，推送时要指定本地分支，这样，git就会把该分支推送到远程库对应的远程分支上

```shell
git push origin 分支名称
例：
git push origin smart
```

![](/images/git/github20.png)

(6)再去github网站上去看分支页面，内容如下。

![](/images/git/github21.png)

![](/images/git/github22.png)

## 6.5 将本地分支跟踪服务器分支

```shell
git branch --set-upstream-to=origin/远程分支名称 本地分支名称
例：
git branch --set-upstream-to=origin/smart smart
```

![](/images/git/github23.png)

## 6.6 从远程分支上拉取代码


```shell
git pull orgin 分支名称
例：
git pull orgin smart
```

使用上述命令会把远程分支smart上的代码下载并合并到本地所在分支。

![](/images/git/github24.png)

## 7.工作使用git
**项目经理：**

(1) 项目经理搭建项目的框架。

(2) 搭建完项目框架之后，项目经理把项目框架代码放到服务器。

**普通员工：**

(1) 在自己的电脑上，生成ssh公钥，然后把公钥给项目经理，项目经理把它添加的服务器上面。

(2) 项目经理会给每个组员的项目代码的地址，组员把代码下载到自己的电脑上。

(3) 创建本地的分支dev,在dev分支中进行每天的开发。

(4) 每一个员工开发完自己的代码之后，都需要将代码发布远程的dev分支上。

Master:用户保存发布的项目代码。V1.0,V2.0

Dev:保存开发过程中的代码。
