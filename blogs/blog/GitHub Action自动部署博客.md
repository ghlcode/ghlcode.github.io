---
title: GitHub Action自动部署博客
date: 2022/12/15
permalink: /blog/dc8b5e.html
categories:
 - blog
tags:
 - blog
---

之前的自动部署有一些python脚本需要手动执行，这一次将他们也交给GitHub Action来做，进一步简化博客部署流程。

其中发现当没有新的文章时，不能触发master分支的推送，因此在`autoFrontmatter.py`中添加了一个`changeFlag.txt`记录当前时间来对每一次部署进行标记。

```
name: Deploy

# 触发条件：在 push 到 master 分支后
on:
  push:
    branches:
      - master

# 任务
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      - name: Set up Python 3.8
        uses: actions/setup-python@v1
        with:
          python-version: 3.8

      - name: Update Frontmatter
        run: python utils/autoFrontmatter.py

      - name: Update Sidebar
        run: python utils/autoSidebar.py

      - name: Commit
        env:
          GIT_NAME: ${{ secrets.GIT_NAME }}
          GIT_EMAIL: ${{ secrets.GIT_EMAIL }}
        run: |
          git config --local user.name $GIT_NAME
          git config --local user.email $GIT_EMAIL
          git add .
          git commit -m "Github action update at `date '+%Y-%m-%d %H:%M:%S'`."

      - name: Push
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: master

      - name: Build
        run: npm install && npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist
```