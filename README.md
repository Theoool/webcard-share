# OpenLink - 智能书签管理平台

![OpenLink Logo](/public/Vector2.svg)
<!-- 建议在此处添加一张项目主页截图或演示GIF -->

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

Trae AI




使用了 1 个参考
Fixing the Layout Component Type Error
It looks like you're encountering a type error in your Next.js project, specifically related to the Layout component in your dynamic route. The error is occurring because Next.js expects the params property to be a Promise, but you're providing it as a regular object.

Let's fix this issue in your layout file:

layout.tsx
应用
import { Metadata } from "next";// Update the Props type to match Next.js expectationstype LayoutProps = {  children: React.ReactNode;  params: Promise<{ id: string }>;};export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {  // Correctly await the params object  const resolvedParams = await params;  const favoriteId = resolvedParams.id;    let title = "收藏夹";  let description = "智能书签管理平台";    try {    const res = await fetch(`${process.env.    NEXT_PUBLIC_NESTJS_API_URL}/    UserFavorites/GetUserFavorite/$    {favoriteId}`, {      next: { revalidate: 60 } // 每分钟重新验      证一次    });        // ... rest of your fetch logic ...  } catch (error) {    console.error("获取收藏夹数据失败:",     error);  }    // ... rest of your metadata return ...}// Update the Layout component to use the correct typeexport default function Layout({ children }: { children: React.ReactNode }) {  return <>{children}</>;}
The key changes are:

Updated the Props type to LayoutProps with the correct structure expected by Next.js
Modified the params handling in generateMetadata to properly await the Promise
Simplified the Layout component to only accept the children prop, which is what Next.js expects
This should resolve the type error and allow your build to complete successfully.

Theoool
复制
删除
#File:
package.json
src
帮我根据这个项目些一个直观高级的readme文档，在可观的地方提示我加图片
Trae AI
参考了 25 个上下文
Workspace
README.md
2-2
package.json
package.json
45-90
README.md
2-5
README.md
25-34
...更多
(19+)
为您编写高级 README 文档
根据您的项目结构和依赖，我将为您创建一个直观、高级的 README 文档。以下是建议的内容：

README.md
应用
# OpenLink - 智能书签管理平台![OpenLink Logo](/public/Vector2.svg)<!-- 建议在此处添加一张项目主页截图或演示GIF -->OpenLink 是一个现代化的智能书签管理平台，集成 AI 摘要、SEO 优化建议、智能标签和语义搜索功能，帮助用户轻松管理和分享网络资源。## ✨ 特性- **AI 驱动的内容分析**  - 自动生成网页摘要  - SEO 优化建议  - 智能标签推荐  - **高级书签管理**  - 收藏夹分类  - 批量导入/导出  - 语义搜索  - **社交分享功能**  - 公开/私有收藏夹  - 生成分享链接  - 宣传封面自动生成- **现代化 UI/UX**  - 响应式设计  - 深色/浅色模式  - 流畅的页面过渡动画<!-- 建议在此处添加功能截图展示 -->## 🚀 快速开始### 前置要求- Node.js 18.0.0 或更高版本- pnpm 8.0.0 或更高版本### 安装```bash# 克隆仓库git clone <repository-url># 进入项目目录cd webcard-share# 安装依赖pnpm install
环境变量配置
创建 .env.local 文件并配置以下环境变量：

plaintext

NEXTAUTH_URL=http://localhost:8080NEXTAUTH_SECRET=your-secret-key# API 配置NEXT_PUBLIC_NESTJS_API_URL=http://localhost:3000# AI 服务配置 (可选)OPENAI_API_KEY=your-openai-api-key
开发
bash
运行
# 启动开发服务器pnpm dev
访问 http://localhost:8080 查看应用。

构建与部署
bash
运行


# 构建生产版本pnpm build# 启动生产服务器pnpm start
🧩 项目架构
OpenLink 采用现代化的前端技术栈：
- 框架: Next.js 14/15 (App Router)
- UI: React 19 + Tailwind CSS + shadcn-ui
- 状态管理: Zustand + React Query

- 动画 : Framer Motion
- 认证 : NextAuth.js
- API 通信 : Socket.io


AI 集成: 自定义 API 与多种 AI 模型集成

目录结构
src/
├── app/                # Next.js 应用路由
├── components/         # UI 组件
│   ├── AIcomponents/   # AI 相关组件
│   ├── home/           # 首页组件
│   ├── semantic-search/ # 语义搜索组件
│   └── ui/             # 基础 UI 组件
├── contexts/           # React 上下文
├── hooks/              # 自定义 Hooks
├── lib/                # 工具函数和 API 客户端
├── Store/              # Zustand 状态管理
└── types/              # TypeScript 类型定义
