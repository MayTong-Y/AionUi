# P5 旧图标与样式收尾

## Goal

完成新视觉的旧样式收尾，移除能安全替换的 IconPark 图标与过时视觉规则，明确仍保留的复杂交互组件。

## Requirements

- 优先替换图标而不改变业务点击、样式和组件 API；不为替换图标改写业务逻辑。
- 清理被 CDS 取代的配色、气泡、面板和输入框视觉，保留有用户自定义合同的样式入口。
- Arco 保留项必须记录组件名、实际用途和原因；不得通过隐藏旧 import 或无差别透传冒充依赖已移除。
- 用户要求先改完再实际检查，必要静态检查集中执行，不启动实际程序或浏览器。

## Acceptance Criteria

- [x] 图标迁移与已替代样式清理。
- [x] 明确保留组件和未完成边界，不能把保留项写成已移除。
- [x] 静态检查通过；实际检查延期记录齐全。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
