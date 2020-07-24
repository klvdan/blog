---
title: Ubuntu 国内源更新
date: 2020-07-08
sidebar: auto
---

::: tip
1. 由于Debain系的服务器较多，且比CentOS版要省内存，所以经常使用Ubuntu的云服务器或者WSL的Ubuntu子系统

2. 默认Ubuntu源在国外，下载起来太慢了，所以更换成国内源，加快速度

3. 本文主要记录Ubuntu系统源、Pip源、Npm源的配置，Pip和Npm的源同样适用Windows
:::

## Ubuntu源更新
- 更新文件 `/etc/apt/sources.list`
	```bash
	# 1. 备份默认源文件
	sudo mv /etc/apt/sources.list /etc/apt/sources.list.bk
	# 2. 写入国内源，以清华源为例
	sudo vim /etc/apt/sources.list
	```
- 写入内容如下
	```
	deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
	deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
	deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
	deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

	# 以下为源码镜像，一般不用
	# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
	# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
	# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
	# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
	```

## Pip源更新
- 临时使用
	```bash
	pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
	```
- 全局默认
	```bash
	pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
	```
- 更新pip
	```bash
	# 这个会把pip更新坏
	X pip install pip -U
	# 用这个
	python -m pip install --upgrade pip
	```

## Npm源更新
- 淘宝源
	```bash
	npm config set registry https://registry.npm.taobao.org
	# OR
	yarn config set registry https://registry.npm.taobao.org
	```
- 默认源
	```bash
	npm config set registry https://registry.npmjs.org/
	```

## Go代理 
设置代理 [GoProxy](https://goproxy.io/)
```bash
go env -w GO111MODULE=on
go env -w GOPROXY="https://goproxy.io,direct"
```
