---
title: Python执行终端命令
date: 2022/09/13
permalink: /pages/8a3a74.html
categories:
 - posts
tags:
 - posts
---

Python执行终端命令有多种方法。

## 方法一

使用示例:

```python
import osos.system('ls')
```

该方法无法输出命令执行结果

## 方法二

使用示例：

```python
import osres = os.popen('ls').read()print(res)
```

该方法的返回值即命令输出结果

## 参考

[https://www.cnblogs.com/qican/p/11468866.html](https://www.cnblogs.com/qican/p/11468866.html)