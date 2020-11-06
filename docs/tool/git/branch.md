# 分支管理

## 结构

![](/images/git/branch.png)

## 5.1 概念

分支就是科幻电影里面的平行宇宙，当你正在电脑前努力学习Git的时候，另一个你正在另一个平行宇宙里努力学习SVN。

如果两个平行宇宙互不干扰，那对现在的你也没啥影响。不过，在某个时间点，两个平行宇宙合并了，结果，你既学会了git又学会了SVN！


![](/images/git/branch02.png)

分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了50%的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。

现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

## 5.2 创建与合并分支

git把我们之前每次提交的版本串成一条时间线，这条时间线就是一个分支。截止到目前只有一条时间线，在git里，这个分支叫**主分支**，即**master**分支。HEAD严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支。


(1) 一开始的时候，master分支是一条线，git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点：

![](/images/git/branch03.png)

每次提交，master分支都会向前移动一步，这样，随着你不断提交，master分支的线也越来越长。

(2)当我们创建新的分支，例如dev时，git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上：

![](/images/git/branch04.png)

git创建一个分支很快，因为除了增加一个dev指针，改变HEAD的指向，工作区的文件都没有任何变化。

(3)不过，从现在开始，对工作区的修改和提交就是针对dev分支了，比如新提交一次后，dev指针往前移动一步，而master指针不变：

![](/images/git/branch05.png)

(4)假如我们在dev上的工作完成了，就可以把dev合并到master上。git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并：

![](/images/git/branch06.png)

git合并分支也很快，就改改指针，工作区内容也不变。

(5)合并完分支后，甚至可以删除dev分支。删除dev分支就是把dev指针给删掉，删掉后，我们就剩下了一条master分支：

![](/images/git/branch07.png)

## 案例：

(1) 执行如下命令可以查看当前有几个分支并且看到在哪个分支下工作。

![](/images/git/branch08.png)

(2) 下面创建一个分支dev并切换到其上进行工作。

![](/images/git/branch09.png)

![](/images/git/branch10.png)

(3) 下面我们修改code.txt内容，在里面添加一行，并进行提交。

![](/images/git/branch11.png)

![](/images/git/branch12.png)

(4)dev分支的工作完成，我们就可以切换回master分支：

![](/images/git/branch13.png)

![](/images/git/branch14.png)

查看code.txt，发现添加的内容没有了。因为那个提交是在dev分支上，而master分支此刻的提交点并没有变：

(5) 现在，我们把dev分支的工作成果合并到master分支上：

![](/images/git/branch15.png)

git merge命令用于合并指定分支到当前分支。合并后，再查看code.txt的内容，就可以看到，和dev分支的最新提交是完全一样的。

![](/images/git/branch16.png)

注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。****

![](/images/git/branch17.png)

(6)合并完成后，就可以放心地删除dev分支了，删除后，查看branch，就只剩下master分支了。

![](/images/git/branch18.png)

![](/images/git/branch19.png)

**小结：**
```shell
查看分支：git branch

创建分支：git branch <name>

切换分支：git checkout <name>

创建+切换分支：git checkout -b <name>

合并某分支到当前分支：git merge <name>

删除分支：git branch -d <name>
```

## 5.3 解决冲突

合并分支往往也不是一帆风顺的。

(1) 再创建一个新分支dev。

![](/images/git/branch20.png)

(2) 修改code.txt内容，并进行提交。

![](/images/git/branch21.png)

(3) 切换回master分支。

![](/images/git/branch22.png)

(4) 在master的code.txt添加一行内容并进行提交。

![](/images/git/branch23.png)

现在，master分支和dev分支各自都分别有新的提交，变成了这样：

![](/images/git/branch24.png)

这种情况下，git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突。

(5) 执行如下命令尝试将dev分支合并到master分支上来

![](/images/git/branch25.png)

git告诉我们，code.txt文件存在冲突，必须手动解决冲突后再提交。

![](/images/git/branch26.png)

(7) 查看code.txt的内容。

![](/images/git/branch27.png)

(8) git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存：

![](/images/git/branch28.png)

(9) 再提交。

![](/images/git/branch29.png)

(10) 现在，master分支和dev分支变成了下图所示：

![](/images/git/branch30.png)

(11) 用带参数的git log也可以看到分支的合并情况：

![](/images/git/branch31.png)

(12) 最后工作完成，可以删除dev分支。

![](/images/git/branch32.png)

## 5.4 分支管理策略

**通常，合并分支时，如果可能，git会用fast forward模式，但是有些快速合并不能成而且合并时没有冲突，这个时候会合并之后并做一次新的提交。**但这种模式下，删除分支后，会丢掉分支信息。

(1) 创建切换到dev分支下。

![](/images/git/branch33.png)

(2) 新建一个文件code3.txt编辑内容如下，并提交一个commit。

![](/images/git/branch34.png)

(3) 切换回master分支，编辑code.txt并进行一个提交。

![](/images/git/branch35.png)

![](/images/git/branch36.png)

(4) 合并dev分支的内容到master分支。

![](/images/git/branch37.png)

(5) 出现如下提时，这是因为这次不能进行快速合并，所以git提示输入合并说明信息，输入之后合并内容之后git会自动创建一次新的提交。

![](/images/git/branch38.png)

![](/images/git/branch39.png)

(6) 使用分支命令查看分支信息。

![](/images/git/branch40.png)

(7) 删除dev分支。

![](/images/git/branch41.png)

如果要强制禁用fast forward模式，git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

(1) 创建并切换到dev分支。

![](/images/git/branch42.png)

(2) 修改code.txt内容，并提交一个commit。

![](/images/git/branch43.png)

(3) 切换回master分支。

![](/images/git/branch44.png)

(4) 准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward：

![](/images/git/branch45.png)

因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。

(5) 合并后，我们用git log看看分支历史：

可以看到，不使用Fast forward模式，merge后就像这样：

![](/images/git/branch46.png)

![](/images/git/branch47.png)

## 5.5 Bug分支


软件开发中，bug就像家常便饭一样。有了bug就需要修复，在git中，由于分支是如此的强大，所以，**每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。**

(1) 当你接到一个修复一个代号001的bug的任务时，很自然地，你想创建一个分支bug-001来修复它，但是，等等，当前正在dev上进行的工作还没有提交：

![](/images/git/branch48.png)

并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

(2) git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

![](/images/git/branch49.png)

(3) 首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支：

![](/images/git/branch50.png)

(4) 现在修复bug,把 the new line删掉，然后提交。

![](/images/git/branch51.png)

(5) 修复完成后，切换到master分支，并完成合并，最后删除bug-001分支。

![](/images/git/branch52.png)

(6) 现在bug-001修复完成，是时候接着回到dev分支干活了！

![](/images/git/branch53.png)

(7)工作区是干净的，刚才的工作现场存到哪去了？用git stash list命令看看：

![](/images/git/branch54.png)

作现场还在，git把stash内容存在某个地方了，但是需要恢复一下.

![](/images/git/branch55.png)

**小结：**

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，恢复工作现场。