---
title: Python 打印表格
date: 2022/05/12
permalink: /pages/d48fe0.html
categories:
 - posts
tags:
 - posts
---

使用`Python`在终端打印出好看的表格

```
from prettytable import PrettyTable
table = PrettyTable(['Title1', 'Title2', 'Title3'])

table.add_row([1, 2, 3])
table.add_row([4, 5, 6])

print(table)
```

效果：

![image-20241112112129698](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20241112112129698.png)