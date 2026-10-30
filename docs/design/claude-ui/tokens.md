# Claude 风格设计令牌（P0 产出）

本文件是 P1 实现令牌的唯一依据。数值来自 `project/*.dc.html` 设计稿里 `renderVals()` 中的 `t` 对象。设计稿与本文件冲突时，以本文件为准。

## 1. 颜色

| 令牌                | 用途                           | 浅色                 | 深色                    |
| ------------------- | ------------------------------ | -------------------- | ----------------------- |
| `--cds-s0`          | 窗口底色（侧栏外、对话区背景） | `#f9f9f7`            | `#0b0b0b`               |
| `--cds-s1`          | 侧栏、次级面板                 | `#fcfcfb`            | `#151515`               |
| `--cds-s2`          | 卡片、输入框                   | `#ffffff`            | `#1a1a19`               |
| `--cds-s3`          | 卡片内嵌块、悬停卡片           | `#ffffff`            | `#20201f`               |
| `--cds-pop`         | 弹出菜单、下拉、Tooltip        | `#ffffff`            | `#2c2c2a`               |
| `--cds-a1`          | 悬停底色、细分隔               | `rgba(20,20,20,.05)` | `rgba(255,255,255,.05)` |
| `--cds-a2`          | 边框、选中底色                 | `rgba(20,20,20,.10)` | `rgba(255,255,255,.09)` |
| `--cds-a3`          | 强边框、按下底色               | `rgba(20,20,20,.20)` | `rgba(255,255,255,.18)` |
| `--cds-tx`          | 主文字                         | `#151515`            | `#f5f5f5`               |
| `--cds-tx2`         | 次文字                         | `#525252`            | `#a3a3a3`               |
| `--cds-tx3`         | 说明、占位符                   | `#737373`            | `#8f8f8f`               |
| `--cds-clay`        | 品牌色：图标发送按钮、强调点   | `#d97757`            | `#d97757`               |
| `--cds-clay-hover`  | 品牌色悬停                     | `#cc5a36`            | `#cc5a36`               |
| `--cds-clay-strong` | 白字主按钮底色                 | `#b5512f`            | `#b5512f`               |
| `--cds-clay-light`  | 品牌浅底（选中项、徽标）       | `#fbf3ef`            | `rgba(217,119,87,.16)`  |
| `--cds-clay-text`   | 品牌色文字                     | `#b5512f`            | `#e08264`               |
| `--cds-blue-tint`   | 信息浅底                       | `#f0f4f8`            | `#1d2733`               |
| `--cds-blue-text`   | 信息文字                       | `#193c5f`            | `#b9d3ee`               |
| `--cds-ok`          | 成功                           | `#2f7d4f`            | `#6cc28a`               |
| `--cds-warn`        | 警告                           | `#8a5a12`            | `#e0a458`               |
| `--cds-danger`      | 危险                           | `#c62828`            | `#f87171`               |
| `--cds-code-bg`     | 代码块底色                     | `#f5f5f2`            | `#111111`               |
| `--cds-code-kw`     | 代码关键字                     | `#1f5fa8`            | `#8fb8e8`               |
| `--cds-diff-add`    | diff 新增行底色                | `#e6f4ea`            | `rgba(108,194,138,.14)` |
| `--cds-diff-del`    | diff 删除行底色                | `#fdecec`            | `rgba(239,68,68,.14)`   |
| `--cds-seg-track`   | 分段控件轨道                   | `rgba(0,0,0,.06)`    | `rgba(255,255,255,.06)` |
| `--cds-seg-thumb`   | 分段控件滑块                   | `#ffffff`            | `#3a3a37`               |

用户消息气泡底色用 `--cds-a1`（叠在 `--cds-s0` 上），不另造颜色。

## 2. 圆角

| 令牌               | 值       | 用途                         |
| ------------------ | -------- | ---------------------------- |
| `--cds-r-composer` | `20px`   | 输入框（Composer）           |
| `--cds-r-dialog`   | `16px`   | 对话框、大卡片               |
| `--cds-r-code`     | `12px`   | 代码块                       |
| `--cds-r-bubble`   | `12px`   | 用户消息气泡                 |
| `--cds-r-panel`    | `10px`   | 面板、工具调用卡片、弹出菜单 |
| `--cds-r-btn`      | `8px`    | 按钮、输入控件、侧栏项       |
| `--cds-r-sm`       | `6px`    | 小标签、复选框               |
| `--cds-r-pill`     | `9999px` | 胶囊徽标、分段控件           |

## 3. 阴影

| 令牌                | 浅色                                                                                           | 深色                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--cds-sh-composer` | `0 4px 20px rgba(0,0,0,0.035), inset 0 0 0 1px rgba(20,20,20,0.10)`                            | `0 4px 20px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.09)`                            |
| `--cds-sh-panel`    | `0 0 0 1px rgba(20,20,20,0.10), 0 1px 2px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08)`        | `0 0 0 1px rgba(255,255,255,0.09), 0 2px 8px rgba(0,0,0,0.4)`                                   |
| `--cds-sh-pop`      | `0 0 0 1px rgba(20,20,20,0.10), 0 4px 8px rgba(0,0,0,0.06), 0 12px 28px -2px rgba(0,0,0,0.08)` | `0 0 0 1px rgba(255,255,255,0.09), 0 4px 8px rgba(0,0,0,0.4), 0 12px 28px -2px rgba(0,0,0,0.4)` |

## 4. 字体

| 令牌               | 值                                                                              | 用途                         |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------- |
| `--cds-font-sans`  | `'Segoe UI Variable Text','Segoe UI','Microsoft YaHei UI',system-ui,sans-serif` | 全部正文和控件               |
| `--cds-font-serif` | `'Noto Serif SC',Georgia,serif`（字重 500/600）                                 | 只用于首页问候语、页面大标题 |
| `--cds-font-mono`  | `'Cascadia Code',Consolas,monospace`                                            | 代码、路径                   |

字号：正文 15px，行高 1.7；控件 14px；说明 12–13px；首页问候语 30–32px 衬线；设置页标题 22px 衬线。
不使用 Tiempos、Styrene 等 Anthropic 专有字体。Noto Serif SC 在 P1 打包到本地（不走 Google Fonts 网络请求）。

## 5. 间距与尺寸

- 间距用 4px 网格：4 / 8 / 12 / 16 / 20 / 24 / 32 / 48。
- 侧栏宽 `260px`，收起后 `56px`。
- 标题栏高 `40px`。
- 对话内容和 Composer 最大宽 `720px`，水平居中。
- 对话 + 预览分栏：预览面板默认占 `45%`。
- 设置页内容最大宽 `760px`。
- 侧栏项高 `32px`，按钮高 `32px`（小号 `28px`），图标按钮 `32×32`，图标 `16px`，线宽 `1.75`。

## 6. 与参考实现 cds-theme.css 的偏差

参考仓库 open-claude-ui 的部分取值对比度不足，本项目改为：

- `--cds-tx3`：浅色 `#737373`、深色 `#8f8f8f`（保证 4.5:1）。
- `--cds-clay-text`：浅色 `#b5512f`、深色 `#e08264`。
- 白字主按钮底色用 `--cds-clay-strong #b5512f`，不用 `#d97757`（白字在 `#d97757` 上对比度不足）。`#d97757` 只用于纯图标按钮（如发送箭头）和装饰。

## 7. 可直接粘贴的 CSS

P1 把下面两段分别追加到 `packages/desktop/src/renderer/styles/themes/default-color-scheme.css` 里**已有的两个选择器块内部**（不要新建裸 `[data-theme='dark']` 选择器，它的优先级不够，会被覆盖）。

浅色（放进 `:root,\n[data-color-scheme='default'] { ... }` 块末尾）：

```css
--cds-s0: #f9f9f7;
--cds-s1: #fcfcfb;
--cds-s2: #ffffff;
--cds-s3: #ffffff;
--cds-pop: #ffffff;
--cds-a1: rgba(20, 20, 20, 0.05);
--cds-a2: rgba(20, 20, 20, 0.1);
--cds-a3: rgba(20, 20, 20, 0.2);
--cds-tx: #151515;
--cds-tx2: #525252;
--cds-tx3: #737373;
--cds-clay: #d97757;
--cds-clay-hover: #cc5a36;
--cds-clay-strong: #b5512f;
--cds-clay-light: #fbf3ef;
--cds-clay-text: #b5512f;
--cds-blue-tint: #f0f4f8;
--cds-blue-text: #193c5f;
--cds-ok: #2f7d4f;
--cds-warn: #8a5a12;
--cds-danger: #c62828;
--cds-code-bg: #f5f5f2;
--cds-code-kw: #1f5fa8;
--cds-diff-add: #e6f4ea;
--cds-diff-del: #fdecec;
--cds-seg-track: rgba(0, 0, 0, 0.06);
--cds-seg-thumb: #ffffff;
--cds-r-composer: 20px;
--cds-r-dialog: 16px;
--cds-r-code: 12px;
--cds-r-bubble: 12px;
--cds-r-panel: 10px;
--cds-r-btn: 8px;
--cds-r-sm: 6px;
--cds-r-pill: 9999px;
--cds-sh-composer: 0 4px 20px rgba(0, 0, 0, 0.035), inset 0 0 0 1px rgba(20, 20, 20, 0.1);
--cds-sh-panel: 0 0 0 1px rgba(20, 20, 20, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.08);
--cds-sh-pop: 0 0 0 1px rgba(20, 20, 20, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06), 0 12px 28px -2px rgba(0, 0, 0, 0.08);
--cds-font-sans: 'Segoe UI Variable Text', 'Segoe UI', 'Microsoft YaHei UI', system-ui, sans-serif;
--cds-font-serif: 'Noto Serif SC', Georgia, serif;
--cds-font-mono: 'Cascadia Code', Consolas, monospace;
```

深色（放进 `[data-color-scheme='default'][data-theme='dark'] { ... }` 块末尾。圆角和字体不随主题变化，浅色块里写过一次即可，这里不重复）：

```css
--cds-s0: #0b0b0b;
--cds-s1: #151515;
--cds-s2: #1a1a19;
--cds-s3: #20201f;
--cds-pop: #2c2c2a;
--cds-a1: rgba(255, 255, 255, 0.05);
--cds-a2: rgba(255, 255, 255, 0.09);
--cds-a3: rgba(255, 255, 255, 0.18);
--cds-tx: #f5f5f5;
--cds-tx2: #a3a3a3;
--cds-tx3: #8f8f8f;
--cds-clay: #d97757;
--cds-clay-hover: #cc5a36;
--cds-clay-strong: #b5512f;
--cds-clay-light: rgba(217, 119, 87, 0.16);
--cds-clay-text: #e08264;
--cds-blue-tint: #1d2733;
--cds-blue-text: #b9d3ee;
--cds-ok: #6cc28a;
--cds-warn: #e0a458;
--cds-danger: #f87171;
--cds-code-bg: #111111;
--cds-code-kw: #8fb8e8;
--cds-diff-add: rgba(108, 194, 138, 0.14);
--cds-diff-del: rgba(239, 68, 68, 0.14);
--cds-seg-track: rgba(255, 255, 255, 0.06);
--cds-seg-thumb: #3a3a37;
--cds-sh-composer: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.09);
--cds-sh-panel: 0 0 0 1px rgba(255, 255, 255, 0.09), 0 2px 8px rgba(0, 0, 0, 0.4);
--cds-sh-pop: 0 0 0 1px rgba(255, 255, 255, 0.09), 0 4px 8px rgba(0, 0, 0, 0.4), 0 12px 28px -2px rgba(0, 0, 0, 0.4);
```

## 8. 旧变量 → CDS 映射表

P1 在同两个选择器块里，把旧语义变量改成引用 CDS 令牌（写 `var(--cds-xxx)`），这样现有 UnoCSS 类和组件不用改就能换肤。浅色、深色写法相同（值随 `--cds-*` 自动切换），除非表里另注。

| 旧变量                                         | 改为                                                      |
| ---------------------------------------------- | --------------------------------------------------------- |
| `--bg-base`                                    | `var(--cds-s0)`                                           |
| `--bg-1`                                       | `var(--cds-s1)`                                           |
| `--bg-2`                                       | `var(--cds-s2)`                                           |
| `--bg-3`                                       | `var(--cds-s3)`                                           |
| `--bg-4`、`--bg-5`、`--bg-6`                   | `var(--cds-a1)`、`var(--cds-a2)`、`var(--cds-a3)`         |
| `--bg-8`、`--bg-9`、`--bg-10`                  | `var(--cds-pop)`、`var(--cds-a2)`、`var(--cds-a3)`        |
| `--bg-hover`                                   | `var(--cds-a1)`                                           |
| `--bg-active`                                  | `var(--cds-a2)`                                           |
| `--text-primary`、`--color-text-1`、`--text-0` | `var(--cds-tx)`                                           |
| `--text-secondary`                             | `var(--cds-tx2)`                                          |
| `--text-disabled`                              | `var(--cds-tx3)`                                          |
| `--border-base`                                | `var(--cds-a2)`                                           |
| `--border-light`                               | `var(--cds-a1)`                                           |
| `--primary`                                    | `var(--cds-clay-strong)`                                  |
| `--brand`                                      | `var(--cds-clay)`                                         |
| `--brand-hover`                                | `var(--cds-clay-hover)`                                   |
| `--brand-light`                                | `var(--cds-clay-light)`                                   |
| `--success` / `--warning` / `--danger`         | `var(--cds-ok)` / `var(--cds-warn)` / `var(--cds-danger)` |
| `--info`                                       | `var(--cds-blue-text)`                                    |
| `--message-user-bg`                            | `var(--cds-a1)`                                           |
| `--message-tips-bg`                            | `var(--cds-blue-tint)`                                    |
| `--dialog-fill-0`                              | `var(--cds-s2)`                                           |
| `--fill`、`--fill-0`                           | `var(--cds-a1)`                                           |

注意：

- 项目里**没有 `--bg-7`**，不要新建，也不要引用。
- 表里没列的旧变量（`--inverse`、`--text-white`、`--fill-white-to-black`、`--border-special`、`--workspace-btn-bg`、`--thought-gradient`、`--color-guid-agent-bar`）P1 先保持原值，P5 清理时再决定删除或映射。
- `--aou-1..10` 品牌色阶改为陶土色阶（浅色块写一次即可；深色块只覆盖 1、2 两档）：

| 档位       | 浅色      | 深色                   |
| ---------- | --------- | ---------------------- |
| `--aou-1`  | `#fbf3ef` | `rgba(217,119,87,.16)` |
| `--aou-2`  | `#f6e1d8` | `rgba(217,119,87,.24)` |
| `--aou-3`  | `#efc6b5` | 同浅色                 |
| `--aou-4`  | `#e6a68d` | 同浅色                 |
| `--aou-5`  | `#df8a6d` | 同浅色                 |
| `--aou-6`  | `#d97757` | 同浅色                 |
| `--aou-7`  | `#cc5a36` | 同浅色                 |
| `--aou-8`  | `#b5512f` | 同浅色                 |
| `--aou-9`  | `#8f3f24` | 同浅色                 |
| `--aou-10` | `#6b2f1b` | 同浅色                 |

- Arco 组件深色依赖 `body[arco-theme='dark']`，不是 `html[data-theme]`。Arco 的覆盖写在 `packages/desktop/src/renderer/styles/arco-override.css`。
