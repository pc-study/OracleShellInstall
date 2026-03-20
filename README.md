<p align="center">
  <img src="https://www.oracleshellinstall.com/apple-touch-icon.png" width="80" alt="OracleShellInstall Logo">
</p>

<h1 align="center">OracleShellInstall</h1>

<p align="center">
  <strong>Oracle 数据库一键自动化安装脚本 | One-Click Oracle Database Automated Installation</strong>
</p>

<p align="center">
  <a href="https://www.oracleshellinstall.com"><img src="https://img.shields.io/badge/官网-oracleshellinstall.com-C74634?style=flat-square" alt="Website"></a>
  <a href="https://www.oracleshellinstall.com/generator.html"><img src="https://img.shields.io/badge/命令生成器-Online-blue?style=flat-square" alt="Generator"></a>
  <a href="https://gitee.com/luciferlpc/OracleShellInstall"><img src="https://img.shields.io/badge/Gitee-Mirror-red?style=flat-square&logo=gitee" alt="Gitee"></a>
  <img src="https://img.shields.io/badge/version-v5.0.0-green?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/Oracle-11g~21c%2F26ai-orange?style=flat-square&logo=oracle" alt="Oracle">
  <img src="https://img.shields.io/badge/Linux-20%2B%20distros-blue?style=flat-square&logo=linux" alt="Linux">
</p>

<p align="center">
  <a href="README.md">🇨🇳 中文</a> | <a href="README_EN.md">🇺🇸 English</a>
</p>

---

一条 Shell 命令完成 Oracle 数据库全流程安装 —— 从操作系统配置、内核优化、用户创建、软件安装、数据库创建到补丁应用，全程无人值守。

支持 **单机 / ASM / RAC** 三种部署模式，覆盖 Oracle 11gR2、12cR2、19c、21c、26ai 全版本，兼容 **20+ 主流 Linux 发行版**。

🔗 **官方网站：** [https://www.oracleshellinstall.com](https://www.oracleshellinstall.com/)

🛠 **在线命令生成器：** [https://www.oracleshellinstall.com/generator.html](https://www.oracleshellinstall.com/generator.html)

---

## 为什么选择 OracleShellInstall？

| | OracleShellInstall | 手动安装 |
|---|---|---|
| **安装耗时** | 20~40 分钟 | 4~8 小时（RAC 1~2 天） |
| **Oracle 版本** | 11gR2 / 12cR2 / 19c / 21c / 26ai 全覆盖 | 每个版本步骤不同 |
| **Linux 系统** | 20+ 发行版自动适配 | 每种系统手动调整 |
| **RAC 集群** | 一条命令搞定 | 手动配置 1~2 天 |
| **补丁应用** | 安装时自动集成 | 安装后手动操作 |
| **出错概率** | 智能校验，极低 | 步骤多，容易遗漏 |
| **可重复性** | 同一命令反复使用 | 每次手动操作 |

---

## 功能特性

- **全自动化** — 一条命令完成 OS 参数配置、依赖安装、用户创建、软件安装、数据库创建全流程
- **多版本支持** — Oracle 11gR2、12cR2、19c、21c、26ai
- **广泛兼容** — CentOS、RHEL、Oracle Linux、Rocky、AlmaLinux、Anolis OS、openEuler、麒麟 Kylin、统信 UOS、Ubuntu、Debian 等 20+ 发行版
- **三种模式** — 单机 (Single)、单机 ASM (Standalone)、RAC 集群
- **ASM 存储** — 自动配置 UDEV 绑盘、multipath 多路径、磁盘组及冗余
- **RAC 集群** — 自动 SSH 互信、Grid 安装、ASM 配置、集群节点搭建
- **补丁升级** — 支持 Grid / Oracle PSU、RU、OJVM 补丁自动应用
- **智能校验** — 安装前自动校验所有参数，避免配置错误
- **安装日志** — 完整的安装过程日志记录，便于问题排查

---

## 快速开始

### 1. 上传文件

将脚本和 Oracle 安装介质上传至服务器 `/soft` 目录：

```
/soft/
  OracleShellInstall.sh          # 安装脚本
  LINUX.X64_193000_db_home.zip   # Oracle 安装介质（以 19c 为例）
```

### 2. 执行安装

**单机模式（最简）：**

```bash
sh OracleShellInstall.sh -install_mode single -lf eth0
```

**单机 + 自定义参数：**

```bash
sh OracleShellInstall.sh \
  -install_mode single \
  -lf eth0 \
  -n orcl \
  -o orcl \
  -dp oracle \
  -ds AL32UTF8 \
  -pdb pdb01
```

**单机 ASM 模式：**

```bash
sh OracleShellInstall.sh \
  -install_mode standalone \
  -lf eth0 \
  -dd /dev/sdb,/dev/sdc \
  -dn DATA \
  -dr EXTERNAL
```

**RAC 双节点集群：**

```bash
sh OracleShellInstall.sh \
  -install_mode rac \
  -lf eth0 \
  -pf eth1,eth2 \
  -hn orcl01,orcl02 \
  -ri 10.0.0.101,10.0.0.102 \
  -vi 10.0.0.103,10.0.0.104 \
  -si 10.0.0.105 \
  -rp 'rootPasswd' \
  -cn orcl-cluster \
  -sn orcl-scan \
  -od /dev/sdb \
  -dd /dev/sdc \
  -o orcl \
  -dp oracle
```

> 💡 不想手写参数？使用 **[在线命令生成器](https://www.oracleshellinstall.com/generator.html)** 可视化配置，一键复制安装命令。

---

## 支持的环境

### Oracle 版本

| 版本 | Release | 支持模式 |
|------|---------|---------|
| **Oracle 11gR2** | 11.2.0.4 | Single / Standalone ASM / RAC |
| **Oracle 12cR2** | 12.2.0.1 | Single / Standalone ASM / RAC |
| **Oracle 19c** | 19.3.0.0 | Single / Standalone ASM / RAC |
| **Oracle 21c** | 21.0.0.0 | Single / Standalone ASM / RAC |
| **Oracle 26ai** | 26.0.0.0 | Single / Standalone ASM / RAC |

### 操作系统

| 系列 | 发行版 |
|------|--------|
| **Red Hat 系** | CentOS 6/7/8、RHEL 6/7/8/9、Oracle Linux 6/7/8/9、Rocky Linux 8/9、AlmaLinux 8/9 |
| **国产系统** | Anolis OS 7/8、openEuler 20.03/22.03、麒麟 Kylin V10、统信 UOS 20 |
| **Debian 系** | Ubuntu 20.04/22.04/24.04、Debian 11/12 |
| **其他** | SLES、Fedora、Deepin 等 |

### 部署模式

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **Single** | 单机文件系统安装 | 开发测试、小型生产 |
| **Standalone** | 单机 + ASM 存储 | 需要 ASM 的单节点环境 |
| **RAC** | 多节点集群 | 高可用生产环境 |

---

## 常用参数

### 公共参数（所有模式通用）

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-install_mode` | 安装模式：single / standalone / rac | **必填** |
| `-lf` | 公网网卡名称 | **必填** |
| `-n` | 主机名 | orcl |
| `-o` | 数据库名称 (DB_NAME) | orcl |
| `-ou` | Oracle 用户名 | oracle |
| `-op` | Oracle 用户密码 | oracle |
| `-dp` | 数据库 sys/system 密码 | oracle |
| `-d` | 软件安装根目录 | /u01 |
| `-ds` | 数据库字符集 | AL32UTF8 |
| `-ns` | 国家字符集 | AL16UTF16 |
| `-dbs` | 数据库块大小 (bytes) | 8192 |
| `-redo` | Redo 日志大小 (MB) | 1024 |
| `-er` | 启用归档模式 | true |
| `-pdb` | PDB 名称（多个逗号分隔） | - |
| `-opd` | 优化数据库参数 | N |
| `-hf` | 配置大页内存 (HugePages) | N |

### 单机模式额外参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-ord` | 数据文件目录 | /oradata |
| `-ard` | 归档文件目录 | /oradata/archivelog |
| `-opa` | Oracle 补丁编号 | - |
| `-jpa` | OJVM 补丁编号 | - |

### ASM 模式额外参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-gu` | Grid 用户名 | grid |
| `-gp` | Grid 用户密码 | oracle |
| `-dd` | DATA 磁盘列表 | **必填** |
| `-dn` | DATA 磁盘组名 | DATA |
| `-dr` | DATA 冗余度 (EXTERNAL/NORMAL/HIGH) | EXTERNAL |
| `-adc` | 脚本自动配置 ASM 磁盘 | Y |
| `-mp` | 配置 multipath 多路径 | Y |

### RAC 模式额外参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-pf` | 心跳网卡名称 | **必填** |
| `-hn` | 所有节点主机名 | **必填** |
| `-ri` | 所有节点公网 IP | **必填** |
| `-vi` | 所有节点虚拟 IP | **必填** |
| `-si` | Scan IP | **必填** |
| `-rp` | root 密码 | **必填** |
| `-cn` | 集群名称 | - |
| `-sn` | Scan 名称 | - |
| `-od` | OCR 磁盘列表 | **必填** |
| `-dd` | DATA 磁盘列表 | **必填** |

> 📋 完整参数列表（50+ 参数）请参阅 **[在线文档](https://www.oracleshellinstall.com/docs.html)** 或 **[llms-full.txt](https://www.oracleshellinstall.com/llms-full.txt)**。

---

## 网站

本仓库同时托管了 OracleShellInstall 的官方网站：**[www.oracleshellinstall.com](https://www.oracleshellinstall.com)**

| 页面 | 说明 |
|------|------|
| [首页](https://www.oracleshellinstall.com/) | 项目介绍与功能展示 |
| [命令生成器](https://www.oracleshellinstall.com/generator.html) | 在线可视化配置参数，实时生成安装命令 |
| [使用文档](https://www.oracleshellinstall.com/docs.html) | 完整的参数参考与安装指南 |
| [安装合集](https://www.oracleshellinstall.com/compat.html) | 180+ 篇各系统版本安装实录 |
| [下载中心](https://www.oracleshellinstall.com/download.html) | 脚本与 Oracle 安装介质下载 |
| [脚本订阅](https://www.oracleshellinstall.com/pricing.html) | 免费版与专业版功能对比 |

网站支持中英文切换、明暗主题、PWA 离线访问。

---

## 注意事项

- 脚本必须以 **root** 用户执行
- 需要在安装介质所在目录下运行（默认 `/soft`）
- Bash 版本 >= 4
- 建议内存 >= 2GB（生产环境建议 >= 8GB）
- 数据库密码需字母开头，可含 `_` `#` `$` 特殊字符，含特殊字符时需单引号包裹

---

## 常见问题

<details>
<summary><b>OracleShellInstall 是什么？</b></summary>

OracleShellInstall 是一款开源的 Oracle 数据库一键自动化安装 Shell 脚本工具。它可以通过一条命令完成 Oracle 数据库的全流程安装，包括操作系统参数配置、内核优化、用户创建、目录规划、Oracle 软件安装、数据库创建和补丁应用。

官方网站：https://www.oracleshellinstall.com
</details>

<details>
<summary><b>支持哪些 Oracle 版本？</b></summary>

支持 Oracle 11gR2、12cR2、19c、21c、26ai。
</details>

<details>
<summary><b>支持哪些 Linux 系统？</b></summary>

支持 20+ 主流 Linux 发行版：CentOS 6/7/8、RHEL 6/7/8/9、Oracle Linux 6/7/8/9、Rocky Linux 8/9、AlmaLinux 8/9、Anolis OS 7/8、openEuler 20.03/22.03、Kylin V10、UOS 20、Ubuntu 20.04/22.04/24.04、Debian 11/12 等。
</details>

<details>
<summary><b>支持 RAC 集群安装吗？</b></summary>

支持。提供三种部署模式：单机 (Single)、单机 ASM (Standalone)、RAC 集群。RAC 模式自动完成所有节点的 OS 配置、SSH 互信、Grid Infrastructure 安装、ASM 配置、Oracle 软件安装和集群数据库创建。
</details>

<details>
<summary><b>如何使用？</b></summary>

1. 将脚本和 Oracle 安装介质上传到服务器 `/soft` 目录
2. 访问 [在线命令生成器](https://www.oracleshellinstall.com/generator.html) 配置参数
3. 复制生成的命令到服务器执行，全程无人值守

最简命令：`sh OracleShellInstall.sh -install_mode single -lf eth0`
</details>

<details>
<summary><b>脚本收费吗？</b></summary>

提供免费社区版和付费专业版。社区版支持单机模式安装，专业版支持所有模式和高级功能。详情：https://www.oracleshellinstall.com/pricing.html
</details>

---

## 联系方式

| 渠道 | 联系方式 |
|------|---------|
| **邮箱** | pc1107750981@163.com |
| **微信** | Lucifer-0622 |
| **Telegram** | [@LUCIFERLPC](https://t.me/LUCIFERLPC) |
| **Discord** | [lucifer0622.](https://discord.gg/jumXJDmW) |
| **WhatsApp** | [+86 16619904622](https://wa.me/8616619904622) |

---

## License

Copyright © 2022-2099 Pengcheng Liu. All rights reserved.

---

<p align="center">
  <b>
    <a href="https://www.oracleshellinstall.com">官网</a> •
    <a href="https://www.oracleshellinstall.com/generator.html">命令生成器</a> •
    <a href="https://www.oracleshellinstall.com/docs.html">文档</a> •
    <a href="https://gitee.com/luciferlpc/OracleShellInstall">Gitee 镜像</a>
  </b>
</p>
