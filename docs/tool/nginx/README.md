# nginx

- 安装（以Ubuntu为例）

法一
```shell
sudo apt update
sudo apt install nginx

下载地址 /etc/nginx
```
- 检查状态 和 版本

```shell
sudo systemctl status nginx

sudo nginx -v
```
- 如果您正在运行防火墙，则还需要打开端口80和443。

```shell
sudo ufw allow 'Nginx Full'
```
- 您可以通过以下方式验证更改：

```shell
sudo ufw status
```
- 查看nginx启动状态
```shell
ps -ef | grep nginx
```

- 使用systemctl管理Nginx服务

您可以像任何其他systemd单位一样管理Nginx服务。 要停止Nginx服务，请运行：
```shell
sudo systemctl stop nginx
```
要再次启动，请键入：
```shell
sudo systemctl start nginx
```
-
重新启动Nginx服务：
```shell
sudo systemctl restart nginx
```
在进行一些配置更改后重新加载Nginx服务：
```shell
sudo systemctl reload nginx
```
如果你想禁用Nginx服务在启动时启动：
```shell
sudo systemctl disable nginx
```
并重新启用它：
```shell
sudo systemctl enable nginx
```
删除nginx，–purge包括配置文件
```shell
sudo apt-get --purge remove nginx
```
自动移除全部不使用的软件包
```shell
sudo apt-get autoremove
```
列出与nginx相关的软件 并删除显示的软件
```shell
dpkg --get-selections|grep nginx

sudo apt-get --purge remove nginx
sudo apt-get --purge remove nginx-common
sudo apt-get --purge remove nginx-core
```
再次执行
```shell
dpkg --get-selections|grep nginx

which nginx # 不在显示nginx
```
这样就可以完全卸载掉nginx包括配置文件
注意点：首先需要停止nginx的服务
```shell
sudo service nginx stop
```

法二

安装gcc g++的依赖库
```shell
sudo apt-get install build-essential
sudo apt-get install libtool
```
安装pcre依赖库（http://www.pcre.org/）
```shell
sudo apt-get update
sudo apt-get install libpcre3 libpcre3-dev
```
安装zlib依赖库（http://www.zlib.net）
```shell
sudo apt-get install zlib1g-dev
```
安装SSL依赖库（16.04默认已经安装了）
```shell
sudo apt-get install openssl
```
安装Nginx

```shell
#下载稳定版本：
wget http://nginx.org/download/nginx-1.16.0.tar.gz
  
#解压：
tar -zxvf nginx-1.16.0.tar.gz
#进入解压目录：
cd nginx-1.16.0
#配置：
./configure --prefix=/usr/local/nginx 
#编译并且安装：
make && make install
#启动：
1. sudo /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
注意：-c 指定配置文件的路径，不加的话，nginx会自动加载默认路径的配置文件，可以通过-h查看帮助命令。
2. cd /usr/local/nginx
　　./sbin/nginx 
#查看进程：
ps -ef | grep nginx
  root@MACHENIKE:/usr/local/nginx# ps -ef | grep nginx
  root 21989 2737 0 16:32 ? 00:00:00 nginx: master process ./sbin/nginx
  nobody 21990 21989 0 16:32 ? 00:00:00 nginx: worker process
  root 22165 5672 0 16:37 pts/0 00:00:00 grep --color=auto nginx

  #根据信号量关闭和重启nginx:

　　例：kill -INT 21989

      相当于重启nginx -> kill -HUP 21989 
```