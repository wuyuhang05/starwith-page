# 星曜同谐 · StarWith

星曜同谐公司官网，围绕 Physical Interaction Model 展示公司的愿景、研究方向、团队与加入方式。网站支持中英文切换，并使用集中式内容结构方便后续维护。

## 页面

- `/`：首页
- `/research`：研究方向
- `/team`：团队介绍
- `/join`：加入我们

页面文案集中在 `lib/content.ts`；导航与页脚位于 `components/SiteChrome.tsx`；视觉样式位于 `app/globals.css`。

## 本地开发

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

## 构建

```bash
# 验证现有 Vinext / Sites 版本
npm run build

# 生成 GitHub Pages 静态文件
npm run build:pages
```

GitHub Pages 产物会生成到 `github-dist/`。该目录不提交到仓库，由 `.github/workflows/pages.yml` 在每次推送 `main` 后自动构建并发布。

## 发布地址

[https://wuyuhang05.github.io/starwith-page/](https://wuyuhang05.github.io/starwith-page/)
