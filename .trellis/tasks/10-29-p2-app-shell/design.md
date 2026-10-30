# P2 设计与责任边界

## 输入

`docs/design/claude-ui/handoff.md`、`tokens.md`、Sider / Titlebar 对应画板。只阅读与本阶段相关的画板片段，不审计全量画板代码。参考仓库 https://github.com/Caho1/open-claude-ui 的视觉实现，AionUI 品牌及既有功能为准。

## 分工

- sidebar 子代理（GPT-6-sol）：仅拥有 `components/layout/Sider/` 的视图文件与自己的定向测试；不改排序和数据 hooks，不改 Layout.tsx 或全局 CSS。
- titlebar 子代理（GPT-6-sol）：仅拥有 `components/layout/Titlebar/`、`WindowControls.tsx` 与自己的定向测试；保留窗口调用和平台分支，不改主进程。
- 主会话：Layout.tsx、styles/layout.css、themes/base.css、必要的主进程过期注释、任务文档、集成和最小运行检查。

## 接口和布局

保留 `LayoutContext` 合同；桌面收起宽度 56px，移动端仍为 0。侧栏子树在桌面收起时保持挂载并依据上下文呈现图标导航。新增 `--cds-sider-width: 260px` 与 `--cds-sider-collapsed-width: 56px`，现有调宽 Hook 仍以 px 数值工作，动态样式通过自定义属性与 CSS 宽度连接。

标题栏由 `--titlebar-height: 40px` 驱动，保留移动端 48px 例外；macOS 不调整未经实机验证的原生按钮坐标。CDS Provider 包在 LayoutContext 外，覆盖新外壳和 portal，不重新挂载路由内容。

## 兼容与恢复

不改变路由、窗口 IPC、BrowserWindow 选项或数据层。保留现有 DnD 和 resize 管线。只回退本阶段文件差异即可恢复旧外壳；不覆盖 P1 或接手前既有未提交修改。
