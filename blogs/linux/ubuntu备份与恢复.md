---
title: ubuntu备份与恢复
date: 2022/10/21
permalink: /pages/16e3f6.html
categories:
 - linux
tags:
 - linux
---

由于经常配置环境出问题，因此备份系统尤为重要。

## **备份**

- 切换 `root` 用户
  
    ```
    sudo su
    ```
    
- 进入 `/` 目录
  
    ```
    cd /
    ```
    
- 备份
  
    ```
    sudo tar -zcpf /home/backup.tar.gz --exclude=/proc --exclude=/lost+found --exclude=/sys --exclude=/cdrom --exclude=/mnt --exclude=/media --exclude=/home/ide/ --exclude=/home/java/ --exclude=/home/WORKING_DIRECTORY/ --exclude=/home/workspace/ --exclude=/home/aosp-latest.tar --exclude=/home/backup.tar.gz /
    ```
    
    会在 `/home` 目录下生成一个名为 `backup.tar.gz` 的压缩包
    
    > tar : 这不用多说
    -zcpf: tar命令打包的设置，可自行查询
    /home/backup.tar.gz：压缩后的文件名
    --exclude: 一些忽略文件
    最后的 / ， 代表被压缩的目录
    > 

## **恢复**

- 切换到`root`用户进入`/`分区
- 恢复
  
    ```
    tar xvpfz /home/backup.tar.gz -C /
    ```