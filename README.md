# 龙苑农庄 · 官方网站

> 版本：**V2.0.1.20260827** ｜ 广东韶关始兴隘子镇 · 地道客家风味农庄

## 一句话简介

龙苑农庄位于广东省韶关市始兴县隘子镇，是一家以地道客家菜、田园民宿、农事体验为核心的乡村文旅品牌。本网站为品牌官方门户，承载农庄介绍、菜品展示、民宿预订、周边游玩、联系我们五大板块。

## 站点结构（6 个页面）

| 页面 | 文件 | 主要内容 |
|---|---|---|
| 首页 | `index.html` | 品牌首屏、实力数据、媒体认可、顾客好评、特色菜品、农庄主人、农景、荣誉资质 |
| 关于农庄 | `about.html` | 张九龄后裔客家文化传承、两代传承故事、荣誉资质、媒体报导 |
| 农庄一览 | `farm.html` | 用餐容量、包间、空调、停车、户外场景 |
| 民宿一览 | `homestay.html` | 4 类房型（大床房 / 双床房 / 商务三床房 / 两房一厅家庭套房） |
| 周边游玩 | `attractions.html` | 满堂大围、张九龄故居祠堂、张发奎故居、趣味钓虾等 |
| 联系我们 | `contact.html` | 联系方式、意见收集、微信公众号、地图导航 |

## 技术栈

- 纯静态 **HTML5 + CSS3 + 原生 JavaScript**（无框架、无构建依赖，开箱即用）
- **响应式设计**（手机 / 平板 / 桌面自适应）
- 模块化 CSS（`style.css` 基础 + `v2-enhancements.css` 精修增强）
- 结构化数据 **Schema.org JSON-LD**（利于搜索引擎收录）
- 部署：**GitHub Pages**（静态托管，零服务器成本）

## 目录结构

```
龙苑农庄-部署-v2.0.1.20260827/
├── index.html              首页
├── about.html             关于农庄
├── farm.html              农庄一览
├── homestay.html          民宿一览
├── attractions.html       周边游玩
├── contact.html           联系我们
├── css/
│   ├── style.css          基础样式
│   └── v2-enhancements.css  精修增强样式
├── js/
│   ├── main.js            主交互脚本
│   └── v2-enhancements.js   增强脚本
├── images/                全站图片资源（74 张，按栏目分组）
├── assets/                二维码等静态资源
├── llms.txt               LLM 友好站点说明
├── robots.txt             搜索引擎抓取规则
├── sitemap.xml            站点地图
├── .nojekyll              禁用 Jekyll 构建（保证静态资源原样发布）
└── README.md              本文件
```

## 本地预览

```bash
# 在文件夹内启动本地服务
python3 -m http.server 8080
# 浏览器打开 http://127.0.0.1:8080
```

## 部署（GitHub Pages）

本仓库可直接推送到 GitHub 并通过 Pages 发布为静态网站。
详见同目录 **`部署操作指引.md`**，按步骤给到 GitHub Token 与仓库名，即可由 AI 助手一键上线。

> ⚠️ 域名说明：若需绑定自定义域名 `www.longyuannz.cn`，请于仓库 **Settings → Pages → Custom domain** 填写；否则请将 `sitemap.xml` 中的域名替换为 GitHub Pages 实际地址（`https://<用户名>.github.io/<仓库名>/`）。

## 版权与联系

© 龙苑农庄。图片与文案版权所有，未经许可不得使用。
联系电话 / 微信：见 `contact.html` 页面。
