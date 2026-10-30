# P1–P5 交接：Claude 风格界面重写

本文交给接手 P1–P5 的 agent。阅读顺序：本文件 → [`tokens.md`](./tokens.md) → 对应子任务的 `prd.md`。

- 父任务：`.trellis/tasks/10-29-claude-ui-rewrite/`
- 设计产出自：`.trellis/tasks/10-29-p0-design-mockups/`
- P1–P5 均已有 PRD / design / implement 和实现代码。当前代码与静态检查已完成，实际应用检查按用户要求延期；任务仍保持 `in_progress`，不得据此宣称全流程验收完成。

> 2026-10-30 启动接线修复：桌面开发版已从旧 E 盘副本接到当前 D 盘仓库，沿用原开发数据；已实际启动并确认新欢迎页与外壳显示。补齐独立数据目录的早期初始化和本地 Electron 运行文件。仅做最小启动确认，其余业务流程未验收；未更新日常版。详情见 P5 verification.md 顶部。

> 2026-10-30 代码实施状态（启动修复前）：继续使用上一任 agent 的 P0 设计和 `tokens.md`，完成欢迎 / 对话、设置 / 团队 / 定时任务 / 登录外观，普通按钮接入 CDS，图标统一 lucide，并移除 IconPark 依赖与构建插件。类型、改动文件 lint / 格式和国际化静态检查通过；没有启动应用、浏览器或全量测试。Arco 实际保留组件及原因详见 P5 `verification.md`，不能称 Arco 已彻底卸载。未提交、未推送。

以下 P1 / P2 记录为此前版本的历史证据，不替代本轮运行验证。

> 2026-10-30 接手更新：P1 已补齐三份任务文档并启动，CDS 令牌、七种基础组件、本地字体及图标/动效依赖已落地，类型检查与 11 项定向测试通过。P1 保留 `in_progress` 等待接入实际页面的最小冒烟检查；P2–P5 仍为 `planning`。详见 `.trellis/tasks/10-29-p1-cds-foundation/verification.md`。用户要求沿用 P0 验收，不全量重查画板；本次未运行全站验证。

> 同日 P2 更新：按用户要求使用 GPT-6-sol 子代理，已实现 CDS 侧栏、40px 标题栏、56px 收起图标栏及窗口按钮。类型、国际化与 22 项相关测试通过；组件预览验证明暗/展开/收起四种状态，未启动真实应用。P2 保留 `in_progress` 等实际应用最小集成检查；P3–P5 尚未实施。详见 `.trellis/tasks/10-29-p2-app-shell/verification.md`。下文「未安装依赖、旧 UI 规范」等为 P0 历史交接信息，已由 P1 完成。

---

## 1. 不可偏离的全局决策

| 决策               | 含义                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 只改视图层         | `common/`（ipcBridge、httpBridge、类型、storage、chatLib）、`services/`、数据类 hooks、i18n 文案、路由地址全部保留。                                               |
| 直接替换默认界面   | 不做主题切换，旧界面不保留。                                                                                                                                       |
| 大小写敏感的品牌位 | 不使用 Claude 的 logo、名称、字体（Tiempos / Styrene）。品牌位一律是 AionUI 名称与 logo，正文用系统栈 + Noto Serif SC。                                            |
| 每阶段结束应用可用 | 新旧共存期间不能出现「必须先做完下一阶段才能用」的状态。                                                                                                           |
| 技术栈             | UnoCSS（已启用 `presetWind3`）、自建 CDS 基础组件、Radix 管无样式弹层、lucide 图标、Framer Motion 动效。Arco 复杂组件（Table / Tree / DatePicker）留到 P5 再处理。 |
| 平台               | 主开发环境 Windows 11；macOS 的 vibrancy 用 Electron Mica（`backgroundMaterial`）。                                                                                |

---

## 2. P0 产出物索引

```
docs/design/claude-ui/
├── tokens.md                  令牌唯一真源（8 节，含可直接粘贴的 CSS）
└── project/
    ├── canvas.json            画布定义：12 张页面画板 + 2 张组件画板
    ├── Main.dc.html           欢迎页 · 浅色
    ├── WelcomeDark.dc.html    欢迎页 · 深色
    ├── Conversation.dc.html   对话页 · 浅色
    ├── ConversationDark.dc.html
    ├── ConversationPreview.dc.html   对话 + 预览分栏 · 浅色
    ├── ConversationPreviewDark.dc.html
    ├── SiderStates.dc.html    侧栏展开与收起 · 浅色
    ├── SiderStatesDark.dc.html
    ├── Settings.dc.html       设置 · Agent · 浅色
    ├── SettingsDark.dc.html
    ├── Team.dc.html           团队页 · 浅色
    ├── TeamDark.dc.html
    ├── Sider.dc.html          组件 · 侧栏（260×860）
    └── Titlebar.dc.html       组件 · Windows 标题栏（1440×40）
```

说明：

- **深色画板是薄封装**，内容是 `<dc-import name="Conversation" dark="{{ true }}">`，复用浅色组件的 `dark` 分支。改画板时保持这个模式，否则明暗会各自漂移。
- `Sider.dc.html` 和 `Titlebar.dc.html` 不是第 7、8 组页面，而是 P2 直接用得上的组件视图。
- 全部画板已确认不含 Claude / Anthropic 字样与 logo。

---

## 3. 令牌：唯一真源与落地顺序

`tokens.md` 与画板冲突时，**以 `tokens.md` 为准**（文件头已声明）。落地分三步：

1. **追加令牌**：`tokens.md` §7 的两段 CSS，分别粘进 `packages/desktop/src/renderer/styles/themes/default-color-scheme.css` **已有的两个选择器块内部**：
   - `:root, [data-color-scheme='default'] { … }`
   - `[data-color-scheme='default'][data-theme='dark'] { … }`

   不要新建裸 `[data-theme='dark']`。`packages/desktop/src/renderer/utils/theme/tokensToCss.ts` 里写明了自定义主题以 `0,2,0` 优先级注入，裸选择器优先级不够，会被覆盖。

2. **改旧变量指向**：按 `tokens.md` §8 把 `--bg-base`、`--text-primary`、`--brand` 等改成 `var(--cds-*)`。改完之后，现有 UnoCSS 类（`bg-base`、`text-t-primary`、`bg-brand`）自动换肤，**组件不用改**。这是本方案能把 P1 做小的关键。

3. **补 UnoCSS 侧**：`uno.config.ts`（仓库根目录）的 `brandColors`、`aouColors`、`componentColors`、`specialColors` 都已引用 CSS 变量，映射后自动生效。只有需要新增的字号 / 间距工具类时才动这个文件。

已核对的相容性：

- `tokens.md` §8 列出的旧变量在 `default-color-scheme.css` 里全部存在。
- `--bg-7` 确实不存在（0 处），不要新建。
- `--aou-1..10` 是 AOU 紫色阶，改为陶土色阶后，`bg-aou-*` 类会自动跟随。

---

## 4. 画板 → 路由 → 代码落点

| 画板                | 路由                       | 现有实现落点                                                                                                                                                                       |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Main / WelcomeDark  | `/guid`                    | `pages/guid/GuidPage.tsx`（31.8K）、`pages/guid/index.module.css`（13.4K）、`pages/guid/components/`                                                                               |
| Conversation        | `/conversation/:id`        | `pages/conversation/index.tsx`、`pages/conversation/Messages/MessageList.tsx`（29.8K）、`components/chat/SendBox/`、`components/chat/ThoughtDisplay.tsx`                           |
| ConversationPreview | `/conversation/:id` + 预览 | `pages/conversation/Preview/`、`pages/conversation/explorer/`、`pages/conversation/SourceControl/`，分栏在 `components/layout/Layout.tsx`                                          |
| SiderStates         | 全局                       | `components/layout/Sider/`（`index.tsx` 9.4K、`SiderNav/`、`SiderItem.tsx`、`SiderFooter.tsx`、`TeamSiderSection.tsx` 12.7K、`siderOrder.ts` / `useStoredSiderOrder.ts` 拖拽排序） |
| Settings            | `/settings/agent`          | `pages/settings/AgentSettings/`、`pages/settings/`（20 个子页）                                                                                                                    |
| Team                | `/team/:id`                | `pages/team/TeamPage.tsx`（44.3K）、`pages/team/components/`、`pages/team/activity/`                                                                                               |
| Titlebar            | 全局                       | `components/layout/Titlebar/index.tsx`（17.8K）+ `titlebar.css`、`components/layout/WindowControls.tsx`、`packages/desktop/src/index.ts:477`                                       |

规模参考（P0 当时统计，用于判断改动面）：`pages/conversation/` 213 个文件、`pages/settings/` 64、`pages/team/` 48、`pages/guid/` 21、`pages/cron/` 12、`components/settings/` 46、`components/chat/` 21、`components/base/` 17。

---

## 5. 各阶段交接

### P1 — CDS 令牌与基础组件

**输入**：`tokens.md` 全部 8 节。

**要做的**：

- 按第 3 节的顺序落令牌与旧变量映射。
- 在 `components/base/` 建 CDS 基础件（Button、Input、Select 触发器、Dialog、Popover、Tooltip、Toolbar 等），弹层行为交给 Radix。
- 新增依赖：`lucide-react`、`framer-motion`、`@radix-ui/react-*`（当前**均未安装**，已确认）。`classnames` 已有，不要再引 `clsx`。
- **同步更新 UI 规范**：`AGENTS.md` 的 UI Library & Icons 段、`.trellis/spec/desktop/frontend/index.md` 的 Quality Check 条目目前都写着「组件使用 Arco，图标使用 IconPark」。不改这两处，P2–P5 的 `trellis-check` 会按旧规范判违规。
- Noto Serif SC 打包到本地，不走 Google Fonts 网络请求。

**不要做的**：不要在这一阶段替换 Arco / icon-park（基线：Arco 引用 188 个 `.tsx`，icon-park 149 个）。P1 只建立 CDS 层，双轨共存。

**完成判据**：明暗切换下整站无硬编码颜色残留；`bunx tsc --noEmit` 通过；现有页面视觉没有塌。

### P2 — 布局外壳

**输入**：SiderStates、Titlebar 画板，以及 Conversation 画板的侧栏部分。

**落点与注意点**：

- 壳层核心是 `components/layout/Layout.tsx`（25.6K，含 `ArcoLayout`、预览分栏、`LayoutContext`）。这是全项目最粘的地方，改动要小步走。
- 侧栏宽 260px / 收起 56px，做成 CSS 变量。现有的 `useStoredSiderOrder.ts`、`siderOrder.ts` 拖拽排序逻辑保留。
- **标题栏高度**：`styles/themes/base.css:5` 目前是 `--titlebar-height: 36px`，设计稿是 **40px**。改这一个变量，不要在各组件里硬写 40。顺带修正 `packages/desktop/src/index.ts:497` 附近「Titlebar is 45px」的过期注释，并复核 macOS `trafficLightPosition: { x: 10, y: 13 }` 是否需要随高度微调。
- **窗口按钮不需要新写 IPC**：`process/bridge/windowControlsBridge.ts` 已有 `minimize` / `maximize` / `unmaximize` / `close` / `maximizedChanged`，`WindowControls.tsx` 只是外观要换。
- BrowserWindow 已经在 Windows/Linux 用 `frame: false`（`index.ts:477`），macOS 用 `titleBarStyle: 'hidden'`。P2 **不改这两处选项**。
- WebUI 与桌面共用同一个 renderer：`showWindowControls = isElectronDesktop() && !isMacOS()` 这个分支保留，WebUI 下不渲染窗口按钮。
- 移动端分支（`app-titlebar--mobile`、`useContainerWidth`、`PwaPullToRefresh`）不在 P0 画板范围，先保持能跑。

**完成判据**：所有路由能在新壳里打开；侧栏展开/收起/排序/团队区在桌面与 WebUI 都正常。

### P3 — 对话流

**输入**：Conversation、ConversationPreview 画板。

**落点**：

- 消息流：`pages/conversation/Messages/MessageList.tsx`（29.8K）+ `Messages/hooks.ts`（38.2K，滚动锚定、pending confirmation 恢复）。**改视觉不要动 hooks 的锚定逻辑**，这是最容易把对话页改坏的地方。
- 输入框：`components/chat/SendBox/`；思考折叠：`components/chat/ThoughtDisplay.tsx`、`CollapsibleContent.tsx`；工具调用卡片在消息渲染分支里。
- 代码块：`components/Markdown/CodeBlock.tsx` 已经在监听 `data-theme`，换肤会自动跟随；把 highlight 配色对齐 `--cds-code-bg`。
- 预览分栏：`pages/conversation/Preview/`、`explorer/`、`SourceControl/`；宽度逻辑在 `Layout.tsx` 与 `hooks/ui/useProjectPreviewRegionWidth`、`useProjectExplorerColumnWidth`。
- 不要动：`pages/conversation/platforms/`、`runtime/` 及各 Agent 的数据接线。

**完成判据**：各 Agent 对话、流式输出、工具调用、思考折叠、预览开合全部可用。

### P4 — 次级页面

**输入**：Settings、Team 画板。

**落点**：`pages/settings/`（64 文件，20 个子页）、`pages/team/TeamPage.tsx`（44.3K）、`pages/cron/`（12 文件）、`pages/login/`（2 文件）。

**画板缺口**：**定时任务 `/scheduled`、登录 `/login`、团队活动流没有对应画板**。按设置页与侧栏已确立的语言延伸，不要自创第三套视觉。P4 的第一件事是把这三处补进自己的 `design.md`。

设置页左导航分类顺序必须与 `Router.tsx` 现有入口一致（注意：Assistants 已从设置移到顶层 `/assistants`，`/settings/assistants` 只做重定向）。

**完成判据**：20 个设置子页全部可用；新增文字走 i18n key，`node scripts/check-i18n.js` 通过。

### P5 — 清理

- 基线（P0 时）：Arco 引用 188 个 `.tsx`，icon-park 149 个。
- 顺序：先换 icon-park → lucide，再收 Arco。
- 保留的 Arco 复杂组件（Table / Tree / DatePicker 等）要逐条列进 `prd.md` 并说明原因 —— 这是父任务验收标准明确要求的。
- 一并处理旧视觉样式：`styles/arco-override.css`（23.1K）、`styles/MIGRATION.md`、`styles/layout.css` 中被取代的部分。
- 判据：renderer 不再依赖 Arco 视觉样式与 icon-park（保留项除外）。

---

## 6. 每阶段结束的闸门

任何阶段收尾前必须同时满足：

1. 应用能起、能走完主流程（对话、团队、定时任务、设置、预览、工作区、WebUI）。
2. `bunx tsc --noEmit`、`bun run test`、`bun run lint` 通过（lint 只看错误，项目有大量历史 warning，按退出码判）。
3. 新增/修改的用户可见文字走 i18n key。
4. 不违反进程边界：renderer 不 import Node API，跨进程只走 `preload/` 的 IPC bridge。

## 7. 验证命令

```bash
bun run lint:fix                              # 编辑时自动修
bun run format
bunx tsc --noEmit
bun run test
bun run i18n:types && node scripts/check-i18n.js   # 改了 renderer 文字 / locales 时必跑

just check     # 全量：lint + fmt-check + typecheck + i18n
just push      # 需要推送时用；AI 不得自行推送
```

i18n 文件位置：`packages/desktop/src/renderer/services/i18n/locales/<lang>/<module>.json`，13 种语言 × 20 个模块，模块清单在 `packages/desktop/src/common/config/i18n-config.json`。

---

## 8. 已知缺口与风险

1. **画板覆盖不到的地方**：定时任务页、登录页、团队活动流。P4 需要自行延伸并先写进 `design.md`。
2. **规范文档会反向干扰**：`AGENTS.md` 与 `.trellis/spec/desktop/frontend/index.md` 仍写「组件使用 Arco，图标使用 IconPark」。P1 不更新，后续阶段的自检会按旧规范回写 Arco。
3. **`components/base/` 已有 17 个直接子项**，超过目录 ≤10 的约定。按 ratchet 规则，本次不必清理历史超标，但 P1 新增的 CDS 组件要放进子目录，不能让它更糟。
4. **标题栏 36 → 40px 是全局变化**，会挤压所有页面的可视高度（画板按 900px 高绘制），P2 需要复查各页首屏。
5. **暗色画板靠 `dc-import dark` 复用浅色组件**，改任意一侧都要验证另一侧。
6. **`--bg-7` 不存在**，`tokens.md` §8 已标注，不要新建也不要引用。
7. **移动端 / WebUI 适配不在 P0 范围**（父 PRD 明确放在 P2 或 P4）。P2 起要保住 `useContainerWidth`、`PwaPullToRefresh`、`app-titlebar--mobile` 这些分支不崩。
