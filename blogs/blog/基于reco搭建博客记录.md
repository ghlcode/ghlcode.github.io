---
title: 基于reco搭建博客记录
date: 2022/10/16
permalink: /blog/3d0b25.html
categories:
 - blog
tags:
 - blog
---

## **介绍**

在之前我是使用`Vdoing`主题进行博客的搭建，现在切换为`reco`,以下内容为我的搭建记录。  
想参考`Vdoing`搭建的见: 基于Vdoing博客搭建记录

## **安装**

1. 安装必备软件
    - nodejs
    - git
2. 创建一个文件夹
3. 使用包管理初始化
   
    ```
    yarn init # npm init
    ```
    
4. 安装`VuePress`
   
    ```
    yarn add -D vuepress # npm install -D vuepress
    ```
    
5. 在 `package.json` 中添加一些 `scripts`
   
    ```
    {
        "scripts": {
            "dev": "vuepress dev docs",
            "build": "vuepress build docs"
        }
    }
    ```
    
6. 安装主题
   
    ```
    yarn add vuepress-theme-reco    # npm install vuepress-theme-reco --save-dev
    ```
    
7. 引用主题
   
    ```
    // .vuepress/config.js
    module.exports = {
        theme: 'reco'
    }
    ```
    

目录结构参考官方文档[目录结构](https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)  
我的博客所有个性化设置基本全部参考`reco`的使用文档。你可以根据你自己的喜好参考文档进行修改。[文档地址](https://vuepress-theme-reco.recoluan.com/views/1.x/)

## **个性化**

这里是我个人的一些修改和自动化脚本。

- 自动生成侧边栏
在`Vdoing`主体中内置了自动生成侧边栏功能，但是`reco`没有，因此我自己写了一个python脚本在每次推送博客的时候自动根据文章的目录生成侧边栏。具体实现参考：自动添加侧边栏
- 自动添加文章永久链接
`reco`为文章自动生成的链接是文章的名字，这回出现一些中文的链接，不利于SEO。因此，我写了一个python脚本用于自动生成6位十六进制格式的永久链接，同时会自动根据文章所在目录设置分类和标签。具体实现参考：自动生成文章永久链接
- github自动部署以及定时百度链接推送
为了简化每一次的博客更新流程，我使用了`GitHub Actions`。这样我每次更新完博客，只需要将其推送到GitHub，剩下的编译、部署就交给GitHub去完成。具体实现可参考`Vdoing`主题作者的文章：[GitHub Actions 实现自动部署静态博客](https://xugaoyi.com/pages/6b9d359ec5aa5019/) 和 [GitHub Actions 定时运行代码：每天定时百度链接推送](https://xugaoyi.com/pages/f44d2f9ad04ab8d3/)