---
title: Tmux基本用法
date: 2024/09/18
permalink: /76e4f1c0-f9f9-4a57-8b83-d0c4b6057d0e.html
categories:
 - posts
tags:
 - posts
---

Tmux 是一个终端复用器（terminal multiplexer），非常有用，属于常用的开发工具。

它的核心功能是解绑当前运行会话进程和当前终端窗口。即使出现意外情况，当前的终端窗口被kill掉了（断电、断网、手贱点错了等等），你之前使用Tmux执行的会话进程仍在继续运行，并可以绑定到其他的终端窗口继续操作。

## Tmux的作用

核心功能就是解绑窗口和会话进程，将它们彻底分离。

1. 可以在单个窗口访问多个会话进程
2. 可以在新窗口重新接入之前的会话进程
3. 多个窗口共享一个会话进程，多设备或者多人实时共享会话进程

## Tmux的基本用法

### Tmux的安装

一般需要自己安装（但是我发现目前新的Ubuntu好像已经预装了）

```bash
# Ubuntu 或 Debian
$ sudo apt-get install tmux

# CentOS 或 Fedora
$ sudo yum install tmux

# Mac
$ brew install tmux
```

### 启动与退出

完成安装之后，在终端输入 `tmux` 即可

底部有一个状态栏，状态栏的左侧是窗口信息（编号和名称），右侧是系统信息。

![image-20241121194202093](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20241121194202093.png)

按下`Ctrl+d`或者显式输入`exit`命令，就可以退出 Tmux 窗口。

### 快捷键

Tmux有大量的快捷键。所有的快捷键都要使用`Ctrl+b`作为前缀唤醒。我将会在后续讲解常用快捷键的具体使用。

## 会话管理

### 新建

默认第一个创建的会话命名为`0` ，之后是`1` 、`2` 以此类推。

但是，我们平常大多时候需要起一个名字来区别不同的任务。可以使用以下命令来解决

```bash
tmux new -s NAME
```

以上命令启动了一个名为`NAME` 的Tmux会话

如果我们当前已经处于Tmux会话中，可以通过快捷键 `Ctrl+b c` ****创建一个默认名称的会话

若想自定义名字则通过快捷键 `Crtl+b :` ，然后输入 `new -s NAME` 创建

### 解绑

在Tmux窗口中使用快捷键 `Ctrl+d`  或者输出命令 `tmux detach` ，此时会退出Tmux窗口，但会话和进程依旧保留在后台

可以通过 `tmux ls`  查看当前所有的Tmux会话

### 接入

使用 `tmux a`  快速接入第一个Tmux会话，或者使用 `tmux a -t NAME` 指定名字接入

### 杀死

在当前Tmux会话中输入 `exit` 

或者在终端中使用以下命令

```bash
# 使用会话编号
$ tmux kill-session -t 0

# 使用会话名称
$ tmux kill-session -t SESSION_NAME
```

### 切换

使用 `tmux switch`  进行切换

```bash
# 使用会话编号
$ tmux switch -t 0

# 使用会话名称
$ tmux switch -t SESSION_NAME
```

或者，使用快捷键 `Ctrl+b s` 可以查看并切换会话

## 其他命令

还有一些关于窗口操作之类的命令，但是我不常用，因此不在这里过多介绍

你可以使用 `tmux list-keys` 列出所有快捷键，及其对应的 Tmux 命令，或者查阅其他相关资料

## 参考链接

- [Tmux 使用教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2019/10/tmux.html)
- [Tmux使用介绍 - 上海交大超算平台用户手册 Documentation (sjtu.edu.cn)](https://docs.hpc.sjtu.edu.cn/login/tmux.html)