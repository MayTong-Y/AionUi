# P3 欢迎页与对话视图

## Goal

按 P0 Main、Conversation、ConversationPreview 和 tokens.md 实现欢迎页、720px 对话列、20px Composer、12px 用户气泡、无底色助手正文、工具/思考折叠和代码块。

## Requirements

- 欢迎页采用衬线问候语，Composer 位于助手选择之前；沿用真实输入、助手、项目和提示词接线。
- 对话阅读列和输入列一致，保留流式输出、锚定、上传、IME、会话引用、工具确认和预览数据逻辑。
- 颜色、字体、圆角和阴影来自 tokens.md；只改变视图与布局。
- 用户 2026-10-30 要求先改完，暂不实际检查；本阶段不启动应用、浏览器或预览，也不重审全部画板。

## Acceptance Criteria

- [x] 欢迎、对话、Composer、思考/工具和代码外观落地。
- [x] 静态类型、改动文件格式与 lint 检查通过。
- [x] 记录待最终实际检查的交互路径，不把静态检查写成实际运行成功。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
