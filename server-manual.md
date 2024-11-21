---
title: 服务器使用说明及注意事项
layout: Layout
---

> ## 公告
>
> 最新文档链接：[Docs (feishu.cn)](https://qxamy0jrcq6.feishu.cn/docx/MQFMdtObYoqQjrxV0v3cx0fhnGd)

## **注意**

## **切记定时备份数据，谨防数据丢失!!!**

## **切记定时备份数据，谨防数据丢失!!!**

## **切记定时备份数据，谨防数据丢失!!!**

- 最好是已经**在自己电脑上调通的代码**，放在服务器上直接运行。并且在自己电脑上保留代码数据，防止服务器出现问题，影响科研进程。
- 该页面可能因浏览器缓存问题不能及时更新，请手动刷新网页，一般三次以上即可。
- **法定节假日**时，会进行服务器关机维护。出现连接不上请复工第一天上午九点后重新尝试。
- 所有账号在**毕业后**会被**回收清除**，届时请自行备份资料，后期出现问题自行负责。

## 初次登录必须使用**终端**进行**强制密码修改**！



## 账号

- 用户名均为 `ubuntu`
- 服务器IP地址为 `10.75.113.232`
- 初始密码为 `1234`
- 端口号由管理员根据情况分配，务必牢记

## 连接方式

- 终端连接——***首次必须使用此方式修改密码***

  ```bash
  ssh ubuntu@10.75.113.232 -p 端口号
  ```

- vscode连接——***推荐***

  [vscode远程连接服务器 | GHLcode](https://www.ghlcode.cn/posts/c3d356)

- 视频参考教程——*感谢朱建鸣同学录制视频*

  [服务器连接讲解.mp4](https://prod-files-secure.s3.us-west-2.amazonaws.com/c40e36a8-5b1b-4cdc-a10f-70b4548dddc5/2e506513-a28b-41fc-ba2c-bea98870d218/服务器连接讲解.mp4)

  

## 双卡使用

双卡机器，在使用第二张显卡的时候，建议在命令前加上以下语句，否则可能会影响其他人正常使用第一张卡

```bash
CUDA_VISIBLE_DEVICES=1
```

例如，执行训练的命令为`python tools/train.py yolov8.py` 修改为以下形式执行

```bash
CUDA_VISIBLE_DEVICES=1 python tools/train.py yolov8.py
```

## 共享目录

shared 目录为共享目录，其中存放了一些常用的软件包和驱动。

目前包含如下文件：

- cuda11.8
- cuda11.7
- Miniconda3
- NVIDIA驱动

> 如其中没有需要的版本，可自行下载 Miniconda的安装可参考 [linux的Miniconda安装](https://ghlcode.cn/300ab539-ab32-4575-856e-28f9e54e5cbf) 真实环境cuda安装可参考 [ubuntu安装cuda及cudnn](https://www.ghlcode.cn/posts/bd74ad)

<aside> 👉 其中`cuda11.7`和`11.8`已经安装好了，默认激活的是`11.7`版本，若想切换到`11.8`，自行在`~/.bashrc` 文件中修改即可，具体步骤如下

1. 修改版本 输入命令: `nano ~/.bashrc` 将文件末尾的 `11.7` 均改为 `11.8` 即可

![image-20241121214029321](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20241121214029321.png)

1. 激活环境 输入命令: `source ~/.bashrc`
2. 测试 输入命令：`nvcc -V`

![image-20241121214044162](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20241121214044162.png)

## 运行程序

在每次运行自己的程序之前，请务必检查当前显卡状态。主要观察显存占用情况和显卡利用率。以确保无其他人正在使用。

终端执行以下命令：

```bash
nvidia-smi
```

![image-20241121214101991](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20241121214101991.png)

## 僵尸进程

有时候可能会出现僵尸进程无法杀死，占用显存，可用以下方式清除。

具体表现形式为上图的显卡利用率为0，但是显存未被清空。

> 造成此情况的原因之一为：中断程序时使用 `~~ctrl+z~~` 建议使用 **`ctrl+c`**

**解决方法：**

终端执行以下命令,列出所有Python进程

```bash
ps aux|grep python
```

![image-20241121214129669](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20241121214129669.png)

根据显示的具体python命令来查杀僵尸进程

其中 `ubuntu` 为用户名，其后面的数字为进程PID， kill PID即可

定时清理

每个人的存储容量初始限制在200GB，但是可能随着使用人数增多，会出现不足200GB的情况。因此请及时清理不必要的权重文件，释放空间。

可以通过 `df -hl` 命令查看剩余可用空间
