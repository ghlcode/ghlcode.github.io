---
title: Severstal 数据集转成coco格式
date: 2023/04/02
permalink: /36f9f8ee-2e68-401f-8c7f-ab2f256cb3ee.html
categories:
 - posts
tags:
 - posts
---

## 简介

Kaggle上的钢板表面缺陷检测数据集Severstal给的是一个csv格式的标注文件，不是一般的coco或者voc格式。这里给出将其转为coco格式的代码。对于数据集的分析可以参考这篇文章：[https://www.qixinbo.info/2020/02/15/kaggle-steel/](https://www.qixinbo.info/2020/02/15/kaggle-steel/)

## 代码

```python
# %%
import numpy as np
import pandas as pd
import os, cv2, json, random, shutil
from collections import defaultdict
from pycocotools.coco import COCO
from PIL import Image

# %% [markdown]
# # 读取数据

# %%
train_df = pd.read_csv("train.csv")
train_df.head()

# %% [markdown]
# # 有无缺陷划分

# %%
idx_no_defect = []
idx_defect = []

for col in range(0, len(train_df), 4):
    img_names = [str(i).split("_")[0] for i in train_df.iloc[col:col+4, 0].values]
    if not (img_names[0] == img_names[1] == img_names[2] == img_names[3]):
        raise ValueError
        
    labels = train_df.iloc[col:col+4, 1]
    if labels.isna().all():
        idx_no_defect.append(col)
    else:
        idx_defect.append(col)

# %% [markdown]
# # 标注掩码处理函数

# %%
def name_and_mask(start_idx):
    col = start_idx
    img_names = [str(i).split("_")[0] for i in train_df.iloc[col:col+4, 0].values]
    if not (img_names[0] == img_names[1] == img_names[2] == img_names[3]):
        raise ValueError

    labels = train_df.iloc[col:col+4, 1]
    mask = np.zeros((256, 1600, 4), dtype=np.uint8)

    for idx, label in enumerate(labels.values):
        if label is not np.nan:
            mask_label = np.zeros(1600*256, dtype=np.uint8)
            label = label.split(" ")
            positions = map(int, label[::2])
            length = map(int, label[1::2])
            for pos, le in zip(positions, length):
                mask_label[pos-1:pos+le-1] = 1
            mask[:, :, idx] = mask_label.reshape(256, 1600, order='F')

    return img_names[0], mask

def mask_to_rle(mask):
    '''
    Convert a mask into RLE
    
    Parameters: 
    mask (numpy.array): binary mask of numpy array where 1 - mask, 0 - background

    Returns: 
    sring: run length encoding 
    '''
    pixels= mask.T.flatten()#转置之后再flatten同上
    pixels = np.concatenate([[0], pixels, [0]])#加0是为了后面错位-
    runs = np.where(pixels[1:] != pixels[:-1])[0] + 1#这里要+1
    #其实就是再计算后面位置和前面位置的值相等；不等就输出索引号+1
    runs[1::2] -= runs[::2]
    #每一个不相等索引号相减，后一个-前一个就是长度
    return ' '.join(str(x) for x in runs)

#主要生成mask，根据rle_string(这玩意就是上面的EncodedPixels，图像标签)
# from https://www.kaggle.com/robertkag/rle-to-mask-converter
def rle_to_mask(rle_string,height,width):
    '''
    convert RLE(run length encoding) string to numpy array

    Parameters: 
    rleString (str): Description of arg1 
    height (int): height of the mask
    width (int): width of the mask 

    Returns: 
    numpy.array: numpy array of the mask
    '''
    rows, cols = height, width
    if rle_string == -1:
        return np.zeros((height, width))
    rleNumbers = [int(numstring) for numstring in rle_string.split(' ')]
    #变换为多列格式(像素位置，长度)
    rlePairs = np.array(rleNumbers).reshape(-1,2)
    img = np.zeros(rows*cols,dtype=np.uint8)
    #创建mask，此时还是一行
    for index,length in rlePairs:
        index -= 1
        img[index:index+length] = 255
    #以上画竖线，给出的+1了
    img = img.reshape(cols,rows)#因为画的是竖线，所以cols为行
    return img.T

# %% [markdown]
# # 生成数据集

# %%
def get_dataset(idxs, src_img_path, dst_img_path, json_file):
    # 添加类别定义
    categories = [{'id': 1, 'name': 'class1', 'supercategory': 'object'},
                {'id': 2, 'name': 'class2', 'supercategory': 'object'},
                {'id': 3, 'name': 'class3', 'supercategory': 'object'},
                {'id': 4, 'name': 'class4', 'supercategory': 'object'}]
    coco_dataset = {
        'licenses': [],
        'images': [],
        'annotations': [],
        'info': {
            'year': 2023,
            'version': '1.0',
            'description': 'COCO dataset for instance segmentation',
            'contributor': 'Your Name',
            'url': 'https://yourwebsite.com',
            'date_created': '2023-04-06',
        },
        'categories': categories,
    }

    # 遍历图像文件，并添加图像信息和标注信息
    for col in idxs:
        img_names = [str(i).split("_")[0] for i in train_df.iloc[col:col+4, 0].values]
        # 添加图像信息
        img_id = len(coco_dataset['images']) + 1
        img_path = os.path.join('train_images', img_names[0])
        img = Image.open(img_path)
        img_width, img_height = img.size
        img_info = {
            'id': img_id,
            'file_name': img_names[0],
            'width': img_width,
            'height': img_height,
            'license': None,
            'flickr_url': None,
            'coco_url': None,
            'date_captured': None
        }
        coco_dataset['images'].append(img_info)
        name, mask = name_and_mask(col)
        
        shutil.copy(os.path.join(src_img_path, name), os.path.join(dst_img_path, name))
        
        for ch in range(4):
            contours, _ = cv2.findContours(mask[:, :, ch], cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
            for contour in contours:
                x, y, w, h = cv2.boundingRect(contour)
                polygon = contour.squeeze().tolist()
                polygon.append(polygon[0])  # 添加首尾闭合
                polygon = np.array(polygon)
                polygon = polygon.flatten().tolist()
                ann_id = len(coco_dataset['annotations']) + 1
                ann_info = {
                    'id': ann_id,
                    'image_id': img_id,
                    'category_id': ch+1,
                    'segmentation': [polygon],
                    'bbox': [x, y, w, h],
                    'area': w * h,
                    'iscrowd': 0
                }
                coco_dataset['annotations'].append(ann_info)
    with open(json_file, 'w') as f:
        json.dump(coco_dataset, f)

# %%
# 定义数据集的根目录
dataset_dir = 'Severstal'
# 创建保存训练集、验证集和测试集的目录
annotations_dir = os.path.join(dataset_dir, 'annotations')
train_dir_all = os.path.join(dataset_dir, 'train2017all')
train_dir = os.path.join(dataset_dir, 'train2017')
val_dir = os.path.join(dataset_dir, 'val2017')
test_dir = os.path.join(dataset_dir, 'test2017')
train_json_all = os.path.join(dataset_dir, 'annotations', 'instances_train2017all.json')
train_json = os.path.join(dataset_dir, 'annotations', 'instances_train2017.json')
test_json = os.path.join(dataset_dir, 'annotations', 'instances_test2017.json')
val_json = os.path.join(dataset_dir, 'annotations', 'instances_val2017.json')

folders = [annotations_dir, train_dir_all, train_dir, val_dir, test_dir]

for f in folders:
    if os.path.exists(f):
        shutil.rmtree(f)
    os.mkdir(f)

# 划分训练测试
test_ratio = 0.1

random.shuffle(idx_defect)
num_test = int(len(idx_defect) * test_ratio)

test_images_idx = idx_defect[:num_test]
train_images_idx_all = idx_defect[num_test:]
val_images_idx = idx_defect[num_test:num_test*3]
train_images_idx = idx_defect[num_test*3:]

get_dataset(test_images_idx, 'train_images', test_dir, test_json)
get_dataset(train_images_idx_all, 'train_images', train_dir_all, train_json_all)
get_dataset(train_images_idx, 'train_images', train_dir, train_json)
get_dataset(val_images_idx, 'train_images', val_dir, val_json)
```