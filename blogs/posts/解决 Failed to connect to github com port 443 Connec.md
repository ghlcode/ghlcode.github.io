---
title: 解决 Failed to connect to github.com port 443 Connection refused
date: 2022/12/15
permalink: /posts/821935.html
categories:
 - posts
tags:
 - posts
---



## **问题**

在 `git clone` 时报错：

```
Failed to connect to github.com port 443: Connection refused
```

按照网上教程修改代理无效。

## **解决**

- `GitHub`添加`SSH key`
- 还是不行，报错
  
    ```
    connect to host github.com port 22: Connection timed out
    ```
    
- 修改`22`端口为`443`， 解决问题
    - 打开`.ssh/config`，添加如下内容
      
        ```
        Host github.com
            Hostname ssh.github.com
            Port 443
        ```