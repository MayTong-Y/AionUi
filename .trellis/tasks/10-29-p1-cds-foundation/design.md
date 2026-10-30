# P1 技术设计

## 改动边界

当前缺口是默认主题仍为紫色且没有 CDS 基础组件。主题行为位于 `styles/themes/default-color-scheme.css`，基础组件放在 `components/base/CDS/`，入口不替换现有 `base/index.ts`，避免旧页面被动迁移。

## 文件职责

- `default-color-scheme.css`：从 `tokens.md` 提取两段 CSS，替换表内旧变量；表外旧变量不动。
- `styles/themes/index.css`：导入本地 Noto Serif SC 字体依赖。
- `components/base/CDS/`：入口、Button/Input、Select、弹层、Toolbar、图标与动效默认值及 CSS Module；直接子项不超过 10。
- 根 `package.json` / `bun.lock`：新增 Radix、lucide-react、framer-motion、字体依赖。
- `AGENTS.md`、前端规范与 architecture renderer 参考：明确双轨过渡规则。
- `tests/unit/cds/`：只测试组件对外行为及键盘路径。

## 组件合同

- Button 默认 `type=button`；支持 variant、size、loading。loading 等价禁用并标记 aria-busy，图标按钮由调用方提供可访问名称。
- Input 透传原生属性和 ref；不预置 placeholder。
- Select 使用 Radix 组合 API（Root、Trigger、Value、Content、Item），保留受控/非受控模式；Content portal 到 body。
- Dialog 使用 Root、Trigger、Content、Title、Description、Close；Content 统一 overlay 与 portal；标题和关闭文字由调用方提供。
- Popover、Tooltip 同样保留 Radix 的组合 API 和事件，Portal 不引入额外主题状态。默认主题变量在根元素上，弹层自然继承明暗外观。
- Toolbar 使用 Radix 的方向键导航。基础组件均不依赖业务服务。
- `CdsIcon` 提供 Lucide 默认 16px / 1.75 线宽；`CdsProvider` 提供 Tooltip 上下文与 MotionConfig reducedMotion=user；后续壳层按需接入，P1 不改启动路径。

## 兼容与恢复

旧变量名保留，UnoCSS 无需改变；自定义主题继续覆盖既有变量。CDS 初始只改变默认主题，不扩大自定义主题的序列化合同。字体资源通过构建工具解析为本地产物。P2 才调整标题栏高度与侧栏宽度。

恢复时只撤回本次明确列出的文件差异和新增 CDS 文件；不重置已有 Trellis、设计稿或其他未提交修改。

## 来源

- Radix Dialog / Select：https://www.radix-ui.com/primitives/docs/components/dialog 、https://www.radix-ui.com/primitives/docs/components/select
- Motion 减弱动态：https://motion.dev/docs/react-accessibility
- Lucide React：https://lucide.dev/guide/react
