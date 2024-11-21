---
title: 基于Vdoing博客搭建记录
date: 2022/07/21
permalink: /blog/d8bd83.html
categories:
 - blog
tags:
 - blog

---



## **介绍**

我之前的博客采用的是基于[VuePress](https://vuepress.vuejs.org/)的[Vdoing](https://doc.xugaoyi.com/)主题，配置了自动化工作流程，推送到github即可自动完成部署。
[我之前的博客](https://shanyaliux.github.io/)  
现在我该用reco主题；具体搭建参考 基于reco搭建博客记录

## **安装**

可以直接克隆我的博客仓库进行快速配置。

```
# clone the project
git clone https://github.com/Shanyaliux/Shanyaliux.github.io.git

# enter the project directory
cd Shanyaliux.github.io

# install dependency 注意：如安装不成功请关闭淘宝源。
npm install # or yarn install

# develop
npm run dev # or yarn dev

```

修改`github`远程仓库

```
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

```
$ git remote -v
# Verify new remote URL
> origin  https://github.com/USERNAME/REPOSITORY.git (fetch)
> origin  https://github.com/USERNAME/REPOSITORY.git (push)
```

## **个性化**

- `package.json`
  
    第九行修改为你自己的域名
    
    ```
    "baiduPush": "node utils/baiduPush.js https://shanyaliux.cn && bash baiduPush.sh",
    ```
    
- `baiduPush.sh`
  
    更换成你自己的百度站点推送API
    
    ```
    curl -H 'Content-Type:text/plain' --data-binary @urls.txt "YOUR API"
    ```
    
- `deploy.sh` 和 `deploy.ps1`
  
    第七行修改为你自己的域名
    
    ```
    echo 'shanyaliux.cn' > CNAME
    ```
    
- 站点内容修改

参考官方文档：[vuepress-theme-vdoing](https://doc.xugaoyi.com/)

## **发布**

- 设置`Actions secrets`
  
    在博客项目的`setting`->`Security`->`Secrets`->`Actions`中添加`ACCESS_TOKEN`，其内容为github生成的token。
    
    github获取token方法：github获取token[官方文档](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
    

![https://cdn.jsdelivr.net/gh/shanyaliux/PicBed/img/image-20220721224949636.png](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20220721224949636.png)

- 此后运行部署脚本即可实现博客发布
  
    ```
    bash ./deploy.sh    # linux
    ./deploy.ps1        # windows
    ```
    

## **参考文章**

[vuepress官网](https://vuepress.vuejs.org/zh/)

[vdoing官网](https://doc.xugaoyi.com/)