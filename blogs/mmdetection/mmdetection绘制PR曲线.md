---
title: mmdetection绘制PR曲线
date: 2022/05/12
permalink: /pages/37ba86.html
categories:
 - mmdetection
tags:
 - mmdetection
---



发现直接使用`matplotlib`绘制曲线在修改图片上一些细节是比较麻烦，因此我决定使用Excel来绘制PR曲线

```python
import os
import mmcv
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

from pycocotools.coco import COCO
from pycocotools.cocoeval import COCOeval

from mmcv import Config
from mmdet.datasets import build_dataset

def getPrecisions(config_file, result_file, metric="bbox"):
    """plot precison-recall curve based on testing results of pkl file.

        Args:
            config_file (list[list | tuple]): config file path.
            result_file (str): pkl file of testing results path.
            metric (str): Metrics to be evaluated. Options are
                'bbox', 'segm'.
    """

    cfg = Config.fromfile(config_file)
    # turn on test mode of dataset
    if isinstance(cfg.data.test, dict):
        cfg.data.test.test_mode = True
    elif isinstance(cfg.data.test, list):
        for ds_cfg in cfg.data.test:
            ds_cfg.test_mode = True

    # build dataset
    dataset = build_dataset(cfg.data.test)
    # load result file in pkl format
    pkl_results = mmcv.load(result_file)
    # convert pkl file (list[list | tuple | ndarray]) to json
    json_results, _ = dataset.format_results(pkl_results)
    # initialize COCO instance
    coco = COCO(annotation_file=cfg.data.test.ann_file)
    coco_gt = coco
    coco_dt = coco_gt.loadRes(json_results[metric])
    # initialize COCOeval instance
    coco_eval = COCOeval(coco_gt, coco_dt, metric)
    coco_eval.evaluate()
    coco_eval.accumulate()
    coco_eval.summarize()
    '''
    precisions[T, R, K, A, M]
    T: iou thresholds [0.5 : 0.05 : 0.95], idx from 0 to 9
    R: recall thresholds [0 : 0.01 : 1], idx from 0 to 100
    K: category, idx from 0 to ...
    A: area range, (all, small, medium, large), idx from 0 to 3
    M: max dets, (1, 10, 100), idx from 0 to 2
    '''
    return coco_eval.eval["precision"]

def PR(config, result, out, thr=0.5):
    """Export PR Excel data

        Args:
            config_file (list[list | tuple]): config file path.
            result_file (str): pkl file of testing results path.
            out (str): path of excel file
            thr(float): output PR Threshold. Optional range: {-1, [0.5, 0.95]}
                If thr == -1: Threshold is 0.5-0.95
    """

    precisions = getPrecisions(config, result)

    recall = np.mat(np.arange(0.0, 1.01, 0.01)).T

    if thr == -1:
        mAP_all_pr = np.mean(precisions[:, :, :, 0, 2], axis=0)
    else:
        T = int((thr - 0.5) / 0.05)
        mAP_all_pr = precisions[T, :, :, 0, 2]

    data = np.hstack((np.hstack((recall, mAP_all_pr[:, 1:])), np.mat(np.mean(mAP_all_pr[:, 1:], axis=1)).T))

    df = pd.DataFrame(data)

    df.to_excel(out, index=False)
```

参考：[https://github.com/xuhuasheng/mmdetection_plot_pr_curve](https://github.com/xuhuasheng/mmdetection_plot_pr_curve)