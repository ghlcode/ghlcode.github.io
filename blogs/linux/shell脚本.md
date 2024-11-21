---
title: shell脚本
date: 2022/05/12
permalink: /pages/b18e1d.html
categories:
 - linux
tags:
 - linux
---

## 常用的shell脚本

## **for 循环**

```
for i in $(seq 1 5)
do
# code
done
```

## **遍历文件夹名**

```
dir=$(ls -l $1 |awk '/^d/ {print $NF}')
echo $1
for i in $dir
do
 echo $i
done
```