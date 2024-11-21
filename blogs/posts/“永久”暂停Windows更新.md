---
title: “永久”暂停Windows更新
date: 2023/04/02
permalink: /897ab84e-6a32-48b1-a72e-3aec26a4f404.html
categories:
 - posts
tags:
 - posts
---



之前一直通过服务里面禁用Windows更新，但是仍旧会自动打开

后来通过将暂停更新设置到10年后，解决总是更新的问题（我相信10年应该换电脑了吧）

## 步骤

- 打开注册表
- 找到`计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings`
- 新建`DWORD(32位)值`
- 取名`FlightSettingsMaxPauseDays`
- 取值十进制天数