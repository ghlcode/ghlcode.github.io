---
title: ubuntu安装cuda及cudnn
date: 2022/10/21
permalink: /pages/bd74ad.html
categories:
 - linux
tags:
 - linux
---



## **准备**

### **查看显卡驱动版本**

```bash
nvidia-smi
```

![image-20241112112320455](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20241112112320455.png)

> 若未安装显卡驱动，则先去安装对应的显卡驱动
> 

输出右上角的`CUDA Version` 即为可安装的最高CUDA版本

### **下载**

去官网下载自己需要的版本 [CUDA Toolkit - Free Tools and Training | NVIDIA Developer](https://developer.nvidia.com/cuda-toolkit)

> 下面教程以 11.3 为例
> 

## **安装CUDA**

```bash
sudo bash cuda_11.3.1_465.19.01_linux.run
```

- 输入 `accept` 回车
  
    ![https://cdn.jsdelivr.net/gh/Ghlerrix/ImageHosting/img/image-20221021170052555.png](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20221021170052555.png)
    
- 只勾选 `CUDA Toolkit` 即可
  
    ![https://cdn.jsdelivr.net/gh/Ghlerrix/ImageHosting/img/image-20221021170147466.png](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20221021170147466.png)
    
- 安装完成
  
    ![https://cdn.jsdelivr.net/gh/Ghlerrix/ImageHosting/img/image-20221021170224254.png](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20221021170224254.png)
    
- 配置环境变量
    - 编辑 `~/.bashrc` 文件
      
        ```bash
        nano ~/.bashrc
        ```
        
    - 末尾添加以下内容
      
        ```bash
        export PATH=/usr/local/cuda-11.3/bin${PATH:+:${PATH}}
        export LD_LIBRARY_PATH=/usr/local/cuda-11.3/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
        ```
        
    
    > 如果你安装的不是11.3版本，请注意更换上面内容中的版本号
    > 
    - 使生效
      
        ```bash
        source ~/.bashrc
        ```
    
- 验证安装
  
    ```bash
    nvcc -V
    ```
    
    出现下图内容即表示安装成功
    
    ![https://cdn.jsdelivr.net/gh/Ghlerrix/ImageHosting/img/image-20221021170620323.png](https://cdn.jsdelivr.net/gh/ghlcode/PicBed/img/image-20221021170620323.png)
    

## **安装CUDNN**

- 解压
  
    ```bash
    tar -xvf cudnn-linux-x86_64-8.5.0.96_cuda11-archive.tar.xz
    ```
    
- 复制文件到cuda环境中
    - 进入解压后的文件夹
      
        ```bash
        cd cudnn-linux-x86_64-8.5.0.96_cuda11-archive/
        ```
        
    - 复制文件
      
        ```bash
        sudo cp include/cudnn.h  /usr/local/cuda/include
        sudo cp lib/libcudnn* /usr/local/cuda/lib64
        ```
        
    - 添加权限
      
        ```bash
        sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*
        ```