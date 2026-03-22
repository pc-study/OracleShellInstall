<p align="center">
  <img src="https://www.oracleshellinstall.com/apple-touch-icon.png" width="80" alt="OracleShellInstall Logo">
</p>

<h1 align="center">OracleShellInstall</h1>

<p align="center">
  <strong>One-Click Oracle Database Automated Installation Script</strong>
</p>

<p align="center">
  <a href="https://www.oracleshellinstall.com"><img src="https://img.shields.io/badge/Website-oracleshellinstall.com-C74634?style=flat-square" alt="Website"></a>
  <a href="https://www.oracleshellinstall.com/generator.html"><img src="https://img.shields.io/badge/Command_Generator-Online-blue?style=flat-square" alt="Generator"></a>
  <a href="https://gitee.com/luciferlpc/OracleShellInstall"><img src="https://img.shields.io/badge/Gitee-Mirror-red?style=flat-square&logo=gitee" alt="Gitee"></a>
  <img src="https://img.shields.io/badge/version-v5.0.0-green?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/Oracle-11g~21c%2F26ai-orange?style=flat-square&logo=oracle" alt="Oracle">
  <img src="https://img.shields.io/badge/Linux-20%2B%20distros-blue?style=flat-square&logo=linux" alt="Linux">
</p>

<p align="center">
  <a href="README.md">🇨🇳 中文</a> | <a href="README_EN.md">🇺🇸 English</a>
</p>

---

Complete Oracle Database installation with a single Shell command — from OS configuration, kernel tuning, user creation, software installation, database creation, to patch application. Fully unattended.

Supports **Single / ASM / RAC** deployment modes, covering Oracle 11gR2, 12cR2, 19c, 21c, and 26ai, compatible with **20+ mainstream Linux distributions**.

**Website:** [https://www.oracleshellinstall.com](https://www.oracleshellinstall.com/)
**Command Generator:** [https://www.oracleshellinstall.com/generator.html](https://www.oracleshellinstall.com/generator.html)

---

## Why OracleShellInstall?

| | OracleShellInstall | Manual Installation |
|---|---|---|
| **Install Time** | 20~40 minutes | 4~8 hours (RAC: 1~2 days) |
| **Oracle Versions** | 11gR2 / 12cR2 / 19c / 21c / 26ai | Different steps per version |
| **Linux Distros** | 20+ auto-adapted | Manual adjustment per distro |
| **RAC Cluster** | Single command | 1~2 days of manual config |
| **Patching** | Auto-integrated during install | Post-install manual work |
| **Error Rate** | Smart validation, very low | Many steps, easy to miss |
| **Repeatability** | Same command, reuse anytime | Manual each time |

---

## Features

- **Fully Automated** — One command handles OS config, dependency install, user creation, software install, database creation
- **Multi-Version** — Oracle 11gR2, 12cR2, 19c, 21c, 26ai
- **Broad Compatibility** — CentOS, RHEL, Oracle Linux, Rocky, AlmaLinux, Anolis OS, openEuler, Kylin, UOS, Ubuntu, Debian, and 20+ more
- **Three Modes** — Single Instance, Standalone ASM, RAC Cluster
- **ASM Storage** — Auto UDEV disk binding, multipath, disk group and redundancy config
- **RAC Cluster** — Auto SSH trust, Grid install, ASM config, cluster node setup
- **Patch Upgrade** — Grid / Oracle PSU, RU, OJVM patches auto-applied
- **Smart Validation** — Pre-install parameter checking to prevent config errors
- **Install Logging** — Complete installation process logs for troubleshooting

---

## Quick Start

### 1. Upload Files

Upload the script and Oracle installation media to the `/soft` directory on your server:

```
/soft/
  OracleShellInstall.sh          # Installation script
  LINUX.X64_193000_db_home.zip   # Oracle media (19c example)
```

### 2. Run Installation

**Single Instance (minimal):**

```bash
sh OracleShellInstall.sh -install_mode single -lf eth0
```

**Single Instance with custom parameters:**

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

**Standalone ASM:**

```bash
sh OracleShellInstall.sh \
  -install_mode standalone \
  -lf eth0 \
  -dd /dev/sdb,/dev/sdc \
  -dn DATA \
  -dr EXTERNAL
```

**RAC Cluster (2 nodes):**

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

> Use the **[Online Command Generator](https://www.oracleshellinstall.com/generator.html)** for visual configuration and one-click command generation.

---

## Supported Environments

### Oracle Versions

| Version | Release | Supported Modes |
|---------|---------|----------------|
| **Oracle 11gR2** | 11.2.0.4 | Single / Standalone ASM / RAC |
| **Oracle 12cR2** | 12.2.0.1 | Single / Standalone ASM / RAC |
| **Oracle 19c** | 19.3.0.0 | Single / Standalone ASM / RAC |
| **Oracle 21c** | 21.0.0.0 | Single / Standalone ASM / RAC |
| **Oracle 26ai** | 26.0.0.0 | Single / Standalone ASM / RAC |

### Linux Distributions

| Family | Distributions |
|--------|--------------|
| **Red Hat** | CentOS 6/7/8, RHEL 6/7/8/9, Oracle Linux 6/7/8/9, Rocky Linux 8/9, AlmaLinux 8/9 |
| **Chinese OS** | Anolis OS 7/8, openEuler 20.03/22.03, Kylin V10, UOS 20 |
| **Debian** | Ubuntu 20.04/22.04/24.04, Debian 11/12 |
| **Others** | SLES, Fedora, Deepin, etc. |

### Deployment Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **Single** | Single-node filesystem install | Dev/test, small production |
| **Standalone** | Single-node + ASM storage | ASM-required single node |
| **RAC** | Multi-node cluster | HA production environments |

---

## Common Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `-install_mode` | Install mode: single / standalone / rac | **Required** |
| `-lf` | Public network interface | **Required** |
| `-n` | Hostname | orcl |
| `-o` | Database name (DB_NAME) | orcl |
| `-dp` | Database sys/system password | oracle |
| `-ds` | Database character set | AL32UTF8 |
| `-pdb` | PDB name(s), comma-separated | - |
| `-dd` | DATA disk list (ASM/RAC required) | - |
| `-er` | Enable archive mode | true |

> Full parameter reference (50+ params): **[Online Docs](https://www.oracleshellinstall.com/docs.html)** or **[llms-full.txt](https://www.oracleshellinstall.com/llms-full.txt)**

---

## Website

This repo also hosts the official website: **[www.oracleshellinstall.com](https://www.oracleshellinstall.com)**

| Page | Description |
|------|-------------|
| [Home](https://www.oracleshellinstall.com/) | Project overview and features |
| [Command Generator](https://www.oracleshellinstall.com/generator.html) | Visual parameter config, real-time command generation |
| [Documentation](https://www.oracleshellinstall.com/docs.html) | Full parameter reference and install guide |
| [Install Gallery](https://www.oracleshellinstall.com/compat.html) | 180+ installation records across OS/version combos |
| [Download](https://www.oracleshellinstall.com/download.html) | Script and Oracle media downloads |
| [Pricing](https://www.oracleshellinstall.com/pricing.html) | Free vs Professional edition comparison |

Supports English/Chinese toggle, dark/light theme, and PWA offline access.

### Website Development

The website is a pure static site (HTML/CSS/JS), auto-deployed to GitHub Pages on push to `main`.

- Local setup guide: [docs/SETUP-GUIDE.md](docs/SETUP-GUIDE.md)
- Full technical docs: [DEVELOPMENT.md](DEVELOPMENT.md)

---

## Notes

- Script must be run as **root**
- Run from the directory containing install media (default: `/soft`)
- Bash version >= 4
- Recommended memory >= 2GB (production >= 8GB)
- Database passwords must start with a letter; special chars `_` `#` `$` require single quotes

---

## FAQ

<details>
<summary><b>What is OracleShellInstall?</b></summary>

OracleShellInstall is an open-source Shell script tool for one-click automated Oracle Database installation. It completes the entire process with a single command — OS configuration, kernel optimization, user creation, directory setup, Oracle software installation, database creation, and patch application.

Website: https://www.oracleshellinstall.com
</details>

<details>
<summary><b>Which Oracle versions are supported?</b></summary>

Oracle 11gR2, 12cR2, 19c, 21c, and 26ai.
</details>

<details>
<summary><b>Which Linux distributions are supported?</b></summary>

20+ mainstream distributions: CentOS 6/7/8, RHEL 6/7/8/9, Oracle Linux 6/7/8/9, Rocky Linux 8/9, AlmaLinux 8/9, Anolis OS 7/8, openEuler 20.03/22.03, Kylin V10, UOS 20, Ubuntu 20.04/22.04/24.04, Debian 11/12, and more.
</details>

<details>
<summary><b>Does it support RAC cluster installation?</b></summary>

Yes. Three deployment modes are available: Single Instance, Standalone ASM, and RAC Cluster. RAC mode automatically handles OS config, SSH trust, Grid Infrastructure, ASM, Oracle software, and cluster database creation across all nodes.
</details>

<details>
<summary><b>How do I use it?</b></summary>

1. Upload the script and Oracle installation media to `/soft` on your server
2. Visit the [Command Generator](https://www.oracleshellinstall.com/generator.html) to configure parameters
3. Copy the generated command and execute on your server — fully unattended

Simplest command: `sh OracleShellInstall.sh -install_mode single -lf eth0`
</details>

---

## Contact

| Channel | Contact |
|---------|---------|
| **Email** | pc1107750981@163.com |
| **WeChat** | Lucifer-0622 |
| **Telegram** | [@LUCIFERLPC](https://t.me/LUCIFERLPC) |
| **Discord** | [lucifer0622.](https://discord.gg/jumXJDmW) |
| **WhatsApp** | [+86 16619904622](https://wa.me/8616619904622) |

---

## License

Copyright © 2022-2099 Pengcheng Liu. All rights reserved.

---

<p align="center">
  <b>
    <a href="https://www.oracleshellinstall.com">Website</a> •
    <a href="https://www.oracleshellinstall.com/generator.html">Generator</a> •
    <a href="https://www.oracleshellinstall.com/docs.html">Docs</a> •
    <a href="https://gitee.com/luciferlpc/OracleShellInstall">Gitee Mirror</a>
  </b>
</p>
