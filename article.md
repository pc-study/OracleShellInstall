# 告别繁琐！一条命令搞定 Oracle 数据库安装

作为 DBA，你是否还在为 Oracle 数据库安装头疼？

手动配置内核参数、创建用户组、设置环境变量、调整 UDEV 规则、配置 ASM 磁盘、搭建 RAC 集群……每次安装少则半天，多则数天，稍有疏忽就要从头再来。

**现在，这一切只需要一条命令。**

---

## OracleShellInstall 是什么？

OracleShellInstall 是一款开源的 Oracle 数据库全自动化安装脚本，从操作系统配置到数据库创建，全程无需人工干预。无论是单机部署、ASM 存储管理，还是 RAC 集群搭建，一条命令即可完成。

脚本历经 5 个大版本迭代，目前已有大量 DBA 和运维工程师在生产环境中使用。

## 核心亮点

**覆盖全版本**：支持 Oracle 11gR2、12cR2、19c、21c、26ai，从经典版本到最新版本全部覆盖。

**兼容 20+ Linux 发行版**：CentOS 6/7/8、RHEL 7/8/9、OracleLinux、Rocky Linux、AlmaLinux、openEuler、麒麟 V10、统信 UOS、Ubuntu、Debian 等主流国产和国际发行版均已适配。

**三种部署模式**：
- 单机模式（Single）— 最简安装，两个参数搞定
- 单机 ASM 模式（Standalone）— 自动配置 ASM 磁盘和存储
- RAC 集群模式 — 自动完成 SSH 互信、Grid 安装、集群节点配置

**自动补丁升级**：支持 Grid PSU/RU、Oracle PSU/RU、OJVM 补丁的自动下载和应用，告别手动打补丁的繁琐。

**智能参数校验**：安装前自动检测所有配置项，提前发现问题，避免安装到一半才报错。

## 使用有多简单？

**第一步**：将脚本和 Oracle 安装介质上传到服务器 `/soft` 目录

**第二步**：执行一条命令

单机安装只需：

```bash
sh OracleShellInstall.sh -install_mode single -lf eth0
```

RAC 集群也不复杂：

```bash
sh OracleShellInstall.sh \
  -install_mode rac \
  -lf eth0 \
  -pf eth1 \
  -hn orcl01,orcl02 \
  -ri 10.0.0.100,10.0.0.101 \
  -vi 10.0.0.102,10.0.0.103 \
  -si 10.0.0.105 \
  -rp yourpassword \
  -od /dev/sdb \
  -dd /dev/sdc
```

然后去喝杯咖啡，回来数据库就装好了。

**第三步**：没有第三步了。

## 在线命令生成器

记不住这么多参数？没关系。

我们上线了一个在线配置工具，选择安装模式、填写参数，一键生成安装命令，复制粘贴即可执行。

访问地址：**https://www.oracleshellinstall.com/generator.html**

网站还提供了 180+ 篇实操教程，覆盖各种操作系统和 Oracle 版本的组合，每篇都有完整的安装步骤和验证记录，可以直接参考。

教程地址：**https://www.oracleshellinstall.com/compat.html**

## 谁在用？

OracleShellInstall 已在众多企业的生产环境中稳定运行，适用于：

- 需要频繁搭建 Oracle 测试环境的 DBA
- 负责批量部署的运维团队
- 正在学习 Oracle 安装的技术人员
- 需要快速交付数据库环境的项目实施人员

## 获取方式

- 官网：https://www.oracleshellinstall.com
- GitHub：https://github.com/pc-study/OracleShellInstall
- 下载：https://www.oracleshellinstall.com/download.html

脚本完全开源免费，欢迎 Star 支持。

如有问题或建议，欢迎通过以下方式联系：
- 邮箱：pc1107750981@163.com
- GitHub Issues

---

*Oracle 安装不该是一件难事。*
