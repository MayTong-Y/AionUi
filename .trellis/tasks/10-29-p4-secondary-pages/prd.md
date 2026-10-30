# P4 设置、团队、定时任务和登录视图

## Goal

沿用 P0 Settings、Team 画板，扩展同一套视觉到定时任务、登录与团队活动流。

## Requirements

- 设置页内容最大 760px，22px 衬线标题、CDS 面板/表单和一致导航；分类、扩展与所有原有设置保持。
- 团队并行列、状态、活动流使用同一套表面、边框和排版，不动团队运行和成员数据。
- 定时任务、登录没有独立 P0 画板：按已确认的设置表单、卡片和品牌语言延伸，不新增产品功能。
- 原有交互和路由地址、身份验证、国际化文字保留。按用户要求，暂不实际运行检查。

## Acceptance Criteria

- [x] 设置共享外壳与标题、团队、定时任务、登录外观落地。
- [x] 新可见文字不硬编码，静态检查通过。
- [x] 未执行的实际业务流程检查单独记录。

## Notes

- Keep `prd.md` focused on requirements, constraints, and acceptance criteria.
- Lightweight tasks can remain PRD-only.
- For complex tasks, add `design.md` for technical design and `implement.md` for execution planning before `task.py start`.
