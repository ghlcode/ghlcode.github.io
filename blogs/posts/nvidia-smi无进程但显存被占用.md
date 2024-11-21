---
title: nvidia-smi无进程但显存被占用
date: 2023/02/05
permalink: /posts/69200c.html
categories:
 - posts
tags:
 - posts
---



## **问题背景**

中断训练任务后，发现`nvidia-smi`无任何进程，但是显存未释放。

尝试 `fuser -v /dev/nvidia*` 也查不到任何进程

## **解决方案**

直接查Python进程，杀掉即可

```python
ps aux|grep python
```