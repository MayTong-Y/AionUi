# Claude 风格界面重写（父任务）

## 目标

把 AionUI 桌面端（含 WebUI，共用同一个 renderer）的界面整体重写为 Claude 桌面客户端风格，并替换为默认界面。

## 背景与已确认的决策（2026-10-29）

- 本 fork 仅供个人学习，**不再同步 upstream**（iOfficeAI/AionUi）。因此不必为了减少合并冲突而限制改动范围。
- 允许直接参考和移植 [open-claude-ui](https://github.com/Caho1/open-claude-ui) 中逆向得到的代码（`code-examples/`、`cds-theme.css`、文档里的数值）。
- 直接替换默认界面，不保留旧界面作为可切换主题。
- 路线：**保留数据层，重写视图层，渐进替换**。
  - 保留：`common/`（ipcBridge、httpBridge、类型、storage、chatLib）、数据类 hooks、`services/`、`utils/`、i18n 文案与路由地址。
  - 重写：布局外壳、所有页面与组件、设计系统。
  - 新旧共存期间，每个阶段结束时应用都必须能正常使用。
- 技术选型（具体在各子任务的 design.md 中细化）：
  - 设计令牌：移植 `cds-theme.css`。
  - 样式：继续用 UnoCSS（已启用 `presetWind3`）。
  - 基础组件：自建 CDS 组件，弹层、下拉、焦点管理使用无样式组件库（如 Radix）。
  - 复杂组件（Table、Tree、DatePicker 等）先保留 Arco 并改样式，P5 再决定是否替换。
  - 图标：lucide；动效：Framer Motion。
- 平台：主要开发环境是 Windows 11。macOS 的 vibrancy 改用 Electron 的 Mica（`backgroundMaterial`）。
- 字体：不使用 Anthropic 的商业字体（Tiempos、Styrene）和 Claude 的 logo、名称，改用系统字体栈或免费字体。

## 子任务

| 子任务                       | 交付物                                                          |
| ---------------------------- | --------------------------------------------------------------- |
| `10-29-p0-design-mockups`    | Claude 风格设计稿（claude-design 画板），确定视觉方向           |
| `10-29-p1-cds-foundation`    | CDS 令牌、基础组件、动效与图标依赖；更新 AGENTS.md 中的 UI 规则 |
| `10-29-p2-app-shell`         | 新布局外壳：侧栏、标题栏（含 Windows 窗口按钮）、路由容器       |
| `10-29-p3-conversation-flow` | 欢迎页、输入框、消息流、思考折叠、工具卡片、代码块、预览分栏    |
| `10-29-p4-secondary-pages`   | 设置、团队、定时任务、登录等页面                                |
| `10-29-p5-legacy-cleanup`    | 移除不再引用的 Arco、icon-park 与旧样式                         |

顺序：P0 → P1 → P2 → P3 → P4 → P5。P3 和 P4 都依赖 P1、P2，P4 可在 P3 主体完成后并行推进。

## 2026-10-30 实施状态

P1–P5 代码已落地，沿用 P0 设计；类型、改动文件 lint / 格式、国际化静态检查通过。用户要求先改完、暂不实际检查，因此保留以下全流程验收项未勾选。P5 已移除 IconPark，Arco 的实际保留清单（含展示兼容项）见对应 verification.md，未宣称整个依赖已移除。未提交、未推送。

## 跨子任务验收标准

- [ ] 默认界面为 Claude 风格，明暗两种外观都可用。
- [ ] 现有功能不缺失：对话（各 Agent）、团队、定时任务、设置、预览、工作区、WebUI 模式。
- [ ] `bunx tsc --noEmit`、`bun run test`、`bun run lint` 通过（lint 只看错误）。
- [ ] 新增和修改的界面文字使用 i18n key，`node scripts/check-i18n.js` 通过。
- [ ] 不违反进程边界：renderer 不使用 Node API，跨进程调用只走 IPC bridge。
- [ ] P5 结束时，renderer 不再依赖旧的 Arco 视觉样式和 icon-park（保留的 Arco 复杂组件除外，需在 P5 中列明）。

## 不在范围内

- 后端（`process/`、AionCore）的功能改动。只有新 UI 确实需要时才做最小改动，并在对应子任务中说明。
- 新增产品功能。重写以还原现有功能为准，参考仓库里有而 AionUI 没有的能力（如语音模式）另开任务。
