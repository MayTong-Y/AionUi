# P1 实现与定向检查记录

日期：2026-10-30。用户要求沿用交接、避免画板全量检查和过多全量验证。

## 已实现

- 明暗两块追加 71 条 CDS 声明，与 `tokens.md` 中的 CSS 一致；旧变量按 §8 映射，默认色阶改为陶土色，未引入 `--bg-7`。
- `components/base/CDS/` 提供 Button、Input、Select、Dialog、Popover、Tooltip、Toolbar，另有 CdsIcon 和 CdsProvider。
- 新增并锁定 Radix、lucide-react、framer-motion、`@fontsource/noto-serif-sc`；主题入口导入 500 / 600 字重，本地 CSS 引用包内字体资源。
- 更新 AGENTS、Trellis 前端规范和 architecture renderer 参考中的旧 UI 规则。
- 沿用 P0 已勾选验收与上次结构检查记录；本次未检查画板全量代码。

## 已通过

- `node node_modules/typescript/bin/tsc --noEmit --pretty false`：退出码 0。
- `node node_modules/vitest/vitest.mjs run tests/unit/cds --reporter=dot`：2 文件、11 测试通过。修正测试焦点操作的 act 提示后，复跑 overlays 文件，6 项通过且无该提示。
- `oxlint` 仅检查新组件及两份测试：10 文件、0 warning、0 error。
- `oxfmt --check` 仅检查本次组件、主题、测试、package.json：14 文件通过。
- 令牌对照：71 条声明的值与来源一致；未运行全站颜色扫描。
- `node scripts/generate-i18n-types.js` 与 `node scripts/check-i18n.js`：通过，类型本已同步，未改翻译。
- `git diff --check`：通过。

## 验证边界

- 未启动 Electron / WebUI，未做全站视觉或主流程验收；不能据此宣称实际页面和所有业务流程通过。
- 依赖通过 npm 缓存中的 Bun 运行，未全局安装 Bun；安装使用 `--ignore-scripts`，未运行项目 postinstall、原生模块重建或 Electron 下载。后续启动开发应用前需要完成这些准备。
- 安装时存在既有 `7zip-bin@5.2.0` patch 未匹配已安装包的提示；未改该历史补丁。
- 未全量运行 lint、format、test、coverage、打包；未改日常安装版、用户数据库或系统配置。
- 未提交、未推送；保留接手时既有修改。

## P2 接入

从 `@renderer/components/base/CDS` 导入组件。在新壳层外包 `CdsProvider`；触发器搭配 `asChild` 与 `CdsButton`，Dialog 必须提供 Title / Description，图标按钮的 aria-label 由调用方使用既有 i18n key 提供。P2 才处理标题栏 40px、侧栏 260 / 56px 和路由容器。

P1 基础层代码与定向检查已完成；任务保留 in_progress，待 P2 接入时完成最小实际页面冒烟检查后再正式归档。P0 沿用既有验收记录，不将未执行的画布操作记作本次已验证。
