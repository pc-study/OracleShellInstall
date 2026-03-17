# OracleShellInstall

Oracle 数据库一键自动化安装脚本，支持 **单机 / ASM / RAC** 三种部署模式，覆盖 Oracle 11gR2 至 26ai 全版本，兼容 20+ 主流 Linux 发行版。

**在线工具：** [https://pc-study.github.io/OracleShellInstall/](https://pc-study.github.io/OracleShellInstall/)

---

## 功能特性

- **全自动化** — 一条命令完成 OS 参数配置、依赖安装、用户创建、软件安装、数据库创建全流程
- **多版本支持** — Oracle 11gR2、12cR2、19c、21c、26ai
- **广泛兼容** — CentOS、RHEL、OracleLinux、Rocky、openEuler、麒麟、统信、Ubuntu、Debian 等 20+ 发行版
- **三种模式** — 单机 (Single)、单机 ASM (Standalone)、RAC 集群
- **ASM 存储** — 自动配置 UDEV 绑盘、multipath 多路径、磁盘组及冗余
- **RAC 集群** — 自动 SSH 互信、Grid 安装、ASM 配置、集群节点搭建
- **补丁升级** — 支持 Grid/Oracle PSU、RU、OJVM 补丁自动应用
- **智能校验** — 安装前自动校验所有参数，避免配置错误

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
sh OracleShellInstall.sh \
  -install_mode single \        # 单机模式
  -lf eth0                      # 公网网卡名称
```

**单机 ASM 模式：**

```bash
sh OracleShellInstall.sh \
  -install_mode standalone \    # 单机 ASM 模式
  -lf eth0 \                   # 公网网卡名称
  -dd /dev/sdb,/dev/sdc        # DATA 磁盘
```

**RAC 集群模式：**

```bash
sh OracleShellInstall.sh \
  -install_mode rac \           # RAC 集群模式
  -lf eth0 \                   # 公网网卡
  -pf eth1,eth2 \              # 心跳网卡
  -hn orcl01,orcl02 \          # 节点主机名
  -ri 10.0.0.101,10.0.0.102 \  # 公网 IP
  -vi 10.0.0.103,10.0.0.104 \  # 虚拟 IP
  -si 10.0.0.105 \             # Scan IP
  -rp 'rootPasswd' \           # root 密码
  -od /dev/sdb \               # OCR 磁盘
  -dd /dev/sdc                 # DATA 磁盘
```

> 更多参数配置请使用 [在线命令生成器](https://pc-study.github.io/OracleShellInstall/generator.html) 或查阅 [使用文档](https://pc-study.github.io/OracleShellInstall/docs.html)。

## 支持的环境

| 类别 | 支持范围 |
|------|---------|
| **Oracle 版本** | 11gR2、12cR2、19c、21c、26ai |
| **操作系统** | CentOS 7/8、RHEL 7/8/9、OracleLinux、Rocky Linux、Anolis OS、openEuler、麒麟 Kylin、统信 UOS、Ubuntu、Debian、AlmaLinux、SLES、Fedora、Deepin 等 |
| **部署模式** | Single（单机）、Standalone（单机 ASM）、RAC（集群） |

## 常用参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `-install_mode` | 安装模式：single / standalone / rac | - |
| `-lf` | 公网网卡名称（必填） | - |
| `-n` | 主机名 | orcl |
| `-o` | 数据库名称 | orcl |
| `-dp` | 数据库 sys/system 密码 | oracle |
| `-ds` | 数据库字符集 | AL32UTF8 |
| `-pdb` | PDB 名称 | - |
| `-dd` | DATA 磁盘列表（ASM/RAC 必填） | - |
| `-er` | 启用归档模式 | true |
| `-opd` | 优化数据库参数 | N |

完整参数列表请参阅 [在线文档](https://pc-study.github.io/OracleShellInstall/docs.html#params-common)。

## 网站

本仓库同时托管了 OracleShellInstall 的官方网站，包含：

- **首页** — 项目介绍与功能展示
- **命令生成器** — 在线配置参数，实时生成安装命令
- **使用文档** — 完整的参数参考与安装指南

网站支持中英文切换和明暗主题。

## 注意事项

- 脚本必须以 **root** 用户执行
- 需要在安装介质所在目录下运行（默认 `/soft`）
- Bash 版本 >= 4
- 建议内存 >= 2GB（生产环境建议 >= 8GB）
- 数据库密码需字母开头，可含 `_` `#` `$` 特殊字符，含特殊字符时需单引号包裹

## 联系方式

- **邮箱：** pc1107750981@163.com
- **微信：** Lucifer-0622

## License

Copyright © 2022-2099 Pengcheng Liu. All rights reserved.
