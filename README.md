# OpenLink - 智能书签管理平台

![OpenLink Logo](/public/Vector2.svg)
<!-- 建议在此处添加一张项目主页截图或演示GIF -->

![OpenLink Logo](/public/THEO.png)

OpenLink 是一个现代化的智能书签管理平台，集成 AI 摘要、SEO 优化建议、智能标签和语义搜索功能，帮助用户轻松管理和分享网络资源。

## ✨ 特性

- **AI 驱动的内容分析**
  - 自动生成网页摘要
  - SEO 优化建议
  - 网页封面拼接生成
  - 智能标签推荐
  
- **高级书签管理**
  - 批量检测站点状态
  - 批量导入/导出
  - 语义话搜索
  
- **社交分享功能**
  - 公开/私有收藏夹
  - 生成分享链接
  - 支持导入导出符合浏览器规范的收藏夹html，




<!-- 建议在此处添加功能截图展示 -->

## 🚀 快速开始

### 前置要求

- Node.js 18.0.0 或更高版本
- pnpm 8.0.0 或更高版本

### 安装

```bash
# 克隆仓库
git clone <repository-url>

# 进入项目目录
cd webcard-share

# 安装依赖
pnpm install
# 启动开发服务器
pnpm dev
```
### 环境变量配置
创建 .env.local 文件并配置以下环境变量：
NEXTAUTH_URL=http://localhost:8080
NEXTAUTH_SECRET=[your-secret-key]
GITHUB_ID=[your-github-id]
GITHUB_SECRET=[your-github-secret]
- 暂时未使用
GOOGLE_ID=[your-google-id]
GOOGLE_SECRET=[your-google-secret]
-
后端项目地址
NEXT_PUBLIC_NESTJS_API_URL=http://localhost:3000




