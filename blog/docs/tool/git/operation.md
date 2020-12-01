# 基本操作



## 2.安装与配置

(1) 安装命令如下：	
```shell
sudo apt-get install git
```
	
```shell
zh@zhubuntu:~$ sudo apt-get install git
[sudo] zh 的密码： 
正在读取软件包列表... 完成
正在分析软件包的依赖关系树       
正在读取状态信息... 完成       
```

(2) 安装成功后，运行如下命令:
	
```shell
git
```

```shell
zh@zhubuntu:~$ git
用法：git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

这些是各种场合常见的 Git 命令：

开始一个工作区（参见：git help tutorial）
   clone             克隆仓库到一个新目录
   init              创建一个空的 Git 仓库或重新初始化一个已存在的仓库

在当前变更上工作（参见：git help everyday）
   add               添加文件内容至索引
   mv                移动或重命名一个文件、目录或符号链接
   restore           恢复工作区文件
   rm                从工作区和索引中删除文件
   sparse-checkout   初始化及修改稀疏检出

检查历史和状态（参见：git help revisions）
   bisect            通过二分查找定位引入 bug 的提交
   diff              显示提交之间、提交和工作区之间等的差异
   grep              输出和模式匹配的行
   log               显示提交日志
   show              显示各种类型的对象
   status            显示工作区状态

扩展、标记和调校您的历史记录
   branch            列出、创建或删除分支
   commit            记录变更到仓库
   merge             合并两个或更多开发历史
   rebase            在另一个分支上重新应用提交
   reset             重置当前 HEAD 到指定状态
   switch            切换分支
   tag               创建、列出、删除或校验一个 GPG 签名的标签对象

协同（参见：git help workflows）
   fetch             从另外一个仓库下载对象和引用
   pull              获取并整合另外的仓库或一个本地分支
   push              更新远程引用和相关的对象

命令 'git help -a' 和 'git help -g' 显示可用的子命令和一些概念帮助。
查看 'git help <命令>' 或 'git help <概念>' 以获取给定子命令或概念的
帮助。
有关系统的概述，查看 'git help git'。
```
## 3.创建一个版本库
(1) 新建一个目录git_test，在git_test目录下创建一个版本库，命令如下：
```shell
git init
```

```shell
zh@zhubuntu:~/www/js$ mkdir git_test
zh@zhubuntu:~/www/js$ cd git_test/
zh@zhubuntu:~/www/js/git_test$ ls -al
总用量 8
drwxrwxr-x 2 zh zh 4096 10月 21 12:07 .
drwxr-xr-x 4 zh zh 4096 10月 21 12:07 ..
zh@zhubuntu:~/www/js/git_test$ git init
已初始化空的 Git 仓库于 /home/zh/www/js/git_test/.git/
zh@zhubuntu:~/www/js/git_test$ ls -al
总用量 12
drwxrwxr-x 3 zh zh 4096 10月 21 12:08 .
drwxr-xr-x 4 zh zh 4096 10月 21 12:07 ..
drwxrwxr-x 7 zh zh 4096 10月 21 12:08 .git
zh@zhubuntu:~/www/js/git_test$
```
可以看到在git_test目录下创建了一个.git隐藏目录，这就是版本库目录。

## 4.版本创建与回退

### 4.1 使用

(1) 在git_test目录下创建一个文件code.txt，编辑内容如下：

```shell
zh@zhubuntu:~/www/js/git_test$ touch code.txt
zh@zhubuntu:~/www/js/git_test$ vim code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
```
(2) 使用如下两条命令可以创建一个版本：

```shell
git add code.txt
git commit -m 'version 1'
```

```shell
zh@zhubuntu:~/www/js/git_test$ git commit -m 'version 1'
[master （根提交） 1cc1138] version 1
 1 file changed, 1 insertion(+)
 create mode 100644 code.txt
```

(3) 使用如下命令可以查看版本记录：

```shell
git log
```

```shell
zh@zhubuntu:~/www/js/git_test$ git log
commit 1cc113870be2eb626d4130004e5bbb18eec9460f (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
zh@zhubuntu:~/www/js/git_test$ 
```

(4) 继续编辑code.txt，在里面增加一行。

```shell
zh@zhubuntu:~/www/js/git_test$ vim code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line 
this is the second line
```

(5) 使用如下命令再创建一个版本并查看版本记录：

```shell
zh@zhubuntu:~/www/js/git_test$ git add code.txt
zh@zhubuntu:~/www/js/git_test$ git commit -m "version 2"
[master d6a06b2] version 2
 1 file changed, 1 insertion(+)
zh@zhubuntu:~/www/js/git_test$ git log
commit d6a06b2045dbf6dab3078ac97fdb3f6d9618fd00 (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:23:52 2020 +0800

    version 2

commit 1cc113870be2eb626d4130004e5bbb18eec9460f
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
```

(6) 现在若想回到某一个版本，可以使用如下命令：

```shell
git reset --hard HEAD^
```
其中HEAD表示当前最新版本，HEAD^表示当前版本的前一个版本,HEAD^^表示当前版本的前前个版本，也可以使用HEAD~1表示当前版本的前一个版本,HEAD~100表示当前版本的前100版本。

现在若觉得想回到版本1，可以使用如下命令：
```shell
zh@zhubuntu:~/www/js/git_test$ git reset --hard HEAD^
HEAD 现在位于 1cc1138 version 1
zh@zhubuntu:~/www/js/git_test$ git log
commit 1cc113870be2eb626d4130004e5bbb18eec9460f (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
zh@zhubuntu:~/www/js/git_test$ 
```
执行命令后使用git log查看版本记录，发现现在只能看到版本1的记录，cat code.txt查看文件内容，现在只有一行，也就是第一个版本中code.txt的内容。

(7) 假如我们现在又想回到版本2，这个时候怎么办？
可以使用如下命令：

```shell
git reset --hard 
```

从上面可以看到版本2的版本号为：

```shell
zh@zhubuntu:~/www/js/git_test$ git log
commit d6a06b2045dbf6dab3078ac97fdb3f6d9618fd00 (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:23:52 2020 +0800

    version 2

commit 1cc113870be2eb626d4130004e5bbb18eec9460f
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
```

(8) 在终端执行如下命令：

```shell
zh@zhubuntu:~/www/js/git_test$ git reset --hard d6a06b2045
HEAD 现在位于 d6a06b2 version 2
zh@zhubuntu:~/www/js/git_test$ git log
commit d6a06b2045dbf6dab3078ac97fdb3f6d9618fd00 (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:23:52 2020 +0800

    version 2

commit 1cc113870be2eb626d4130004e5bbb18eec9460f
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
zh@zhubuntu:~/www/js/git_test$ 
```

现在发现版本2有回来了。可以cat code.txt查看其里面的内容如下：

```shell
cat code.txt
```

```shell
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
zh@zhubuntu:~/www/js/git_test$ 
```

(9) 假如说上面的终端已经关了改怎么回退版本。
我们在执行如下命令将版本回退到版本1。

```shell
zh@zhubuntu:~/www/js/git_test$ git reset --hard HEAD^
HEAD 现在位于 1cc1138 version 1
zh@zhubuntu:~/www/js/git_test$ git log
commit 1cc113870be2eb626d4130004e5bbb18eec9460f (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
zh@zhubuntu:~/www/js/git_test$ 
```

下面把终端关了，然后再打开终端，发现之前版本2的版本号看不到了。
那么怎么再回到版本2呢？git reflog命令可以查看我们的操作记录。

```shell
git reflog
```

```shell
zh@zhubuntu:~/www/js/git_test$ git reflog
1cc1138 (HEAD -> master) HEAD@{0}: reset: moving to HEAD^
d6a06b2 HEAD@{1}: reset: moving to d6a06b2045
1cc1138 (HEAD -> master) HEAD@{2}: reset: moving to HEAD^
d6a06b2 HEAD@{3}: commit: version 2
1cc1138 (HEAD -> master) HEAD@{4}: commit (initial): version 1
zh@zhubuntu:~/www/js/git_test$ 
```

可以看到版本2的版本号，我们再使用如下命令进行版本回退，版本重新回到了版本2。

```shell
zh@zhubuntu:~/www/js/git_test$ git reset --hard d6a06b2
HEAD 现在位于 d6a06b2 version 2
zh@zhubuntu:~/www/js/git_test$ git log
commit d6a06b2045dbf6dab3078ac97fdb3f6d9618fd00 (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:23:52 2020 +0800

    version 2

commit 1cc113870be2eb626d4130004e5bbb18eec9460f
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
zh@zhubuntu:~/www/js/git_test$ 
```

## 4.2 工作区和暂存区

### 4.2.1 工作区(Working Directory)

电脑中的目录，比如我们的git_test，就是一个工作区。

### 4.2.2 版本库(Repository)

工作区有一个隐藏目录.git，这个不是工作区，而是git的版本库。


git的版本库里存了很多东西，其中最重要的就是称为stage(或者叫index)的**暂存区**，还有git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

因为我们创建git版本库时，git自动为我们创建了唯一一个master分支，所以，现在，git commit就是往master分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

![git01](/images/git01.png)

前面讲了我们把文件往git版本库里添加的时候，是分两步执行的：

第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。

(1)下面在git_test目录下再创建一个文件code2.txt，然后编辑内容如下：

```shell
zh@zhubuntu:~/www/js/git_test$ touch code2.txt
zh@zhubuntu:~/www/js/git_test$ vim code2.txt
zh@zhubuntu:~/www/js/git_test$ cat code2.txt
the code first line
zh@zhubuntu:~/www/js/git_test$ 
```

(2)然后再次编辑code.txt内容，在其 中加入一行，编辑后内容如下：

```shell
zh@zhubuntu:~/www/js/git_test$ vi code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
this is the third line
```

(3)使用如下命令查看当前工作树的状态：

```shell
git status
```

```shell
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
	修改：     code.txt

未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
	code2.txt

修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）
zh@zhubuntu:~/www/js/git_test$ 
```

上面提示我们code.txt被修改，而code2.txt没有被跟踪。

(4) 我们使用如下命令把code.txt和code2.txt加入到暂存区，然后再执行git status命令，结果如下：

```shell
zh@zhubuntu:~/www/js/git_test$ git add code.txt
zh@zhubuntu:~/www/js/git_test$ git add code2.txt
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	修改：     code.txt
	新文件：   code2.txt

zh@zhubuntu:~/www/js/git_test$ 
```

所有git add命令是把所有提交的修改存放到暂存区。

(5) 然后，执行git commit就可以一次性把暂存区的所有修改提交到分支创建一个版本。

```shell
h@zhubuntu:~/www/js/git_test$ git commit -m 'version 3'
[master c113093] version 3
 2 files changed, 2 insertions(+)
 create mode 100644 code2.txt
zh@zhubuntu:~/www/js/git_test$ git log
commit c11309317b18d4ecf45afe07b918a38788cb874e (HEAD -> master)
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:43:43 2020 +0800

    version 3

commit d6a06b2045dbf6dab3078ac97fdb3f6d9618fd00
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:23:52 2020 +0800

    version 2

commit 1cc113870be2eb626d4130004e5bbb18eec9460f
Author: zhang han <zhanhan321@126.com>
Date:   Wed Oct 21 12:16:58 2020 +0800

    version 1
zh@zhubuntu:~/www/js/git_test$ 
```

(6) 一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的。执行如下命令可以发现：

```shell
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
无文件要提交，干净的工作区
zh@zhubuntu:~/www/js/git_test$ 
```

现在我们的版本库变成了这样：

![](/images/git02.png)

## 4.3 管理修改

git管理的文件的修改，**它只会提交暂存区的修改来创建版本。**

(1) 编辑code.txt，并使用git add 命令将其添加到暂存区中。

```shell
zh@zhubuntu:~/www/js/git_test$ vi code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
this is the third line
this is the forth line
zh@zhubuntu:~/www/js/git_test$ git add code.txt
```

(2) 继续编辑code.txt，并在其中添加一行。

```shell
zh@zhubuntu:~/www/js/git_test$ vi code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
this is the third line
this is the forth line
this is the new line
zh@zhubuntu:~/www/js/git_test$ 
```

(3) git commit创建一个版本，并使用git status查看，发现第二次修改code.txt内容之后，并没有将其添加的工作区，所以创建版本的时候并没有被提交。

```shell
zh@zhubuntu:~/www/js/git_test$ git commit -m 'version4'
[master 41a91c4] version4
 1 file changed, 1 insertion(+)
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
	修改：     code.txt

修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）
zh@zhubuntu:~/www/js/git_test$ 
```

## 4.4 撤销修改

(1) 继续上面的操作，提示我们可以使用 git checkout -- <文件> 来丢弃工作区的改动。执行如下命令，发现工作区干净了，第二次的改动内容也没了。

```shell
zh@zhubuntu:~/www/js/git_test$ git checkout -- code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
this is the third line
this is the forth line
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
无文件要提交，干净的工作区
zh@zhubuntu:~/www/js/git_test$ 
```

(2) 我们继续编辑code.txt，并在其中添加如下内容，并将其添加的暂存区。

```shell
zh@zhubuntu:~/www/js/git_test$ vi code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
this is the third line
this is the forth line
the new line
zh@zhubuntu:~/www/js/git_test$ git add code.txt
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	修改：     code.txt

zh@zhubuntu:~/www/js/git_test$ 
```

(3) git同样告诉我们，用命令git reset HEAD file可以把暂存区的修改撤销掉，重新放回工作区。

```shell
zh@zhubuntu:~/www/js/git_test$ git reset HEAD code.txt
重置后取消暂存的变更：
M	code.txt
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
尚未暂存以备提交的变更：
  （使用 "git add <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
	修改：     code.txt

修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）
zh@zhubuntu:~/www/js/git_test$ 
```

(4)现在若想丢弃code.txt的修改，执行如下命令即可。

```shell
zh@zhubuntu:~/www/js/git_test$ git checkout -- code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
this is the third line
this is the forth line
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
无文件要提交，干净的工作区
zh@zhubuntu:~/www/js/git_test$ 
```

现在，如果你不但改错了东西，还从暂存区提交到了版本库，则需要进行版本回退。

**小结：**
场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节。

## 4.5 对比文件的不同

对比工作区和某个版本中文件的不同：

(1) 继续编辑文件code.txt，在其中添加一行内容。

```shell
zh@zhubuntu:~/www/js/git_test$ vi code.txt
zh@zhubuntu:~/www/js/git_test$ cat code.txt
this is the first line
this is the second line
this is the third line
this is the forth line
the new line
zh@zhubuntu:~/www/js/git_test$ 
```

(2) 现在要对比工作区中code.txt和HEAD版本中code.txt的不同。使用如下命令：

```shell
zh@zhubuntu:~/www/js/git_test$ git diff HEAD -- code.txt
diff --git a/code.txt b/code.txt
index 66f9219..324317f 100644
--- a/code.txt
+++ b/code.txt
@@ -2,3 +2,4 @@ this is the first line
 this is the second line
 this is the third line
 this is the forth line
+the new line
zh@zhubuntu:~/www/js/git_test$ 
```

(3) 使用如下命令丢弃工作区的改动。

```shell
zh@zhubuntu:~/www/js/git_test$ git checkout -- code.txt
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
无文件要提交，干净的工作区
zh@zhubuntu:~/www/js/git_test$ 
```

**对比两个版本间文件的不同：**

(1) 现在要对比HEAD和HEAD^版本中code.txt的不同，使用如下命令：

```shell
zh@zhubuntu:~/www/js/git_test$ git diff HEAD HEAD^ -- code.txt
diff --git a/code.txt b/code.txt
index 66f9219..01e1274 100644
--- a/code.txt
+++ b/code.txt
@@ -1,4 +1,3 @@
 this is the first line
 this is the second line
 this is the third line
-this is the forth line
zh@zhubuntu:~/www/js/git_test$ 
```

## 4.6 删除文件

(1) 我们把目录中的code2.txt删除。

```shell
zh@zhubuntu:~/www/js/git_test$ rm code2.txt
zh@zhubuntu:~/www/js/git_test$ 
```

这个时候，git知道删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻提示哪些文件被删除了。

```shell
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
尚未暂存以备提交的变更：
  （使用 "git add/rm <文件>..." 更新要提交的内容）
  （使用 "git restore <文件>..." 丢弃工作区的改动）
	删除：     code2.txt

修改尚未加入提交（使用 "git add" 和/或 "git commit -a"）
zh@zhubuntu:~/www/js/git_test$ 
```

(2)现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit：

```shell

zh@zhubuntu:~/www/js/git_test$ git rm code2.txt
rm 'code2.txt'
zh@zhubuntu:~/www/js/git_test$ git status
位于分支 master
要提交的变更：
  （使用 "git restore --staged <文件>..." 以取消暂存）
	删除：     code2.txt

zh@zhubuntu:~/www/js/git_test$ 
```
另一种情况是删错了，可以直接使用git checkout – code2.txt,这样文件code2.txt又回来了。

**小结：**

命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。



