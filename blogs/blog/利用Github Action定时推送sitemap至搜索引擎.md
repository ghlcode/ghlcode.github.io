---
title: 利用Github Action定时推送sitemap至搜索引擎
date: 2023/08/13
permalink: /fe032806-5362-4d82-b746-a0b26ce8b9d9.html
categories:
 - blog
tags:
 - blog
---



目前支持`baidu`和`bing`

可通过以下地址获取代码：

[GitHub - Ghlerrix/NotionNext at baidupush](https://github.com/Ghlerrix/NotionNext/tree/baidupush)

具体代码文件地址为：

[.github/workflows/pushUrl.yml](https://github.com/Ghlerrix/NotionNext/blob/ghlcode.cn/.github/workflows/pushUrl.yml)

[pushUrl.py](https://github.com/Ghlerrix/NotionNext/blob/ghlcode.cn/pushUrl.py)

# 使用方法

- 将上述两个文件添加至自己仓库的主分支（必须主分支，否则定时任务不能执行）
- 添加相关的Action Secrets
    - `BAIDU_TOKEN` 百度token
    - `BING_API_KEY` bing的apikey
    - `URL` 你自己网站的地址，注意是否带有www前缀  url需要带有`https://`前缀
        - 另外需要注意的是url只需要写自己域名即可，像这样`https://ghlcode.cn`
    
    ![https://s2.loli.net/2023/08/17/Odg7vKDhu5RtIpU.png](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/Odg7vKDhu5RtIpU.png)