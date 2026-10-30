# P3 实现设计

依据已确认 P0 画板，tokens.md 数值优先，不重新设计。修改欢迎页 JSX 顺序和 CSS Module、SendBox CSS、MessageText 气泡、messages.css 阅读列、ThoughtDisplay / MessageThinking / CodeBlock 视图。保留所有消息数据、平台适配、滚动锚定和输入事件处理。

共享 Composer 保持现有 TextArea 的 autoSize、ref、IME 和 mention overlay；只改容器、字号、边框和工具栏。代码块的高亮继续监听现有 data-theme，使用 CDS 背景/边框并将交互图标封装进 CDS 按钮。

不改服务、数据 hooks、路由、正式程序或用户数据。用户要求先实现再实际检查，最终仅运行必要静态检查。
