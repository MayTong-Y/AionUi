# P5 实现与静态检查记录

## 2026-10-30 开发版启动接线修复

- 原因：桌面开发版启动 `E:\Apps\AionUi-Local\source\development`，本轮 UI 代码位于 `D:\AI\code\business\AionUI`。两份源码独立，原入口不会显示 D 盘改动。
- 已修复：本地 `ops/desktop.ps1` 读取 `ops/development-source.txt`，当前值指向 D 盘仓库；桌面快捷方式与启动 CMD 继续沿用原入口。后续手动更新日常版也会读取同一开发源码位置，本次未执行更新。
- 数据隔离：将原 E 盘开发副本的 `desktopProfile.ts` 及早期初始化配置接入 D 盘，仍使用 `E:\Apps\AionUi-Local\data\development`；相对路径会被拒绝，未改日常程序或日常数据。
- 本地运行准备：复用同版本 Electron 37.10.3 和 better-sqlite3 12.8.0 的既有运行文件到 D 盘 node_modules。没有安装全局工具，没有运行完整 postinstall。
- 实际启动：D 盘 Electron 主进程与 AionCore 启动成功，后端数据路径匹配开发目录且使用 `--local`。已通过窗口进程路径及画面确认新标题栏、衬线问候语、Composer 下方助手选项和已有项目 / 会话列表加载。
- 检查：数据目录隔离 3 项测试通过；4 个改动文件 lint 0 errors、格式检查与 diff 空白检查通过；TypeScript 通过。未运行全量测试、全路由检查或真实模型请求。
- 启动日志：`E:\Apps\AionUi-Local\data\runtime\ui-development-20261030-192537.stdout.log` 与同名 stderr 日志。
- 启动脚本与说明原件备份：`E:\Apps\AionUi-Local\backups\ui-launcher-20261030-183919`。撤销 `ops/development-source.txt` 的覆盖值可回到原 E 盘源码；退出相应开发进程后再切换，避免重复实例共用开发数据。
- 未提交、未推送。其余业务与视觉验收仍按用户要求保持最小范围。

## 已完成的迁移

- 148 个 renderer 文件的 IconPark / Arco 图标导入迁移到 lucide，默认 16px / 1.75 描边，保留原有大小、事件和状态语义。
- 98 个 renderer 文件中的普通 Arco Button 改用实际原生实现的 CDS Button，保留 loading、禁用、图标、尺寸、危险操作与全宽合同。
- 删除无引用的 `IconParkHOC.tsx`、Vite IconPark 转换插件及预打包配置；移除 package.json / bun.lock 中的 `@icon-park/react`。
- 同步 29 处单元测试的图标替身和团队全屏 E2E 定位；本轮未运行这些测试，不将代码更新写成测试通过。
- 清理 `.i-icon`、过时蓝色 / 玻璃面板和已替代样式。默认 Arco 调色变量、保留浮层、表单和状态使用 CDS 语义变量；自定义主题和用户字体合同保留。
- GitHub 链接保留文字品牌，用 ExternalLink 表示外链动作；不引入 Claude / Anthropic 品牌资源。

## 明确保留的 Arco 组件

`@arco-design/web-react` 仍是实际依赖。以下是当前 renderer 的具名导入统计，括号内为引用文件数；这是保留边界清单，不是全量业务代码审计。普通按钮和所有 IconPark 已迁走，不能据此声称整个 Arco 已卸载。

| 组件                                                                               | 实际用途和保留原因                                                                                                            |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Input (33)、InputNumber (2)、Form (8)、Select (11)                                 | 组合输入、TextArea 自动高度、ref、IME、表单校验、搜索与多选等合同仍由现有组件承担；本轮通过 CDS 令牌改变外观。                |
| Checkbox (8)、Radio (7)、Switch (22)、Slider (1)、TimePicker (1)、Upload (1)       | 设置、定时任务与上传中的受控值 / 事件合同；未在本轮同时重写表单接线。                                                         |
| Dropdown (30)、Menu (30)、Tooltip (65)、Popover (5)、Popconfirm (4)、Trigger (2)   | 保留菜单键盘行为、侧栏关闭时浮层销毁、移动端禁用、指定挂载容器和确认动作。新基础层已有 Radix 原语，现有组合浮层未假装已迁移。 |
| Modal (25)、Message (79)、Notification (3)                                         | 命令式确认 / 通知、异步加载与全局反馈入口；其共享外观接入 CDS。                                                               |
| Tree (2)、List (1)、Tabs (3)、Collapse (9)、Steps (2)                              | 工作区树、列表、复合页签、设置折叠和步骤状态；保留节点 / 面板切换合同。                                                       |
| ConfigProvider (2)、Layout (3)                                                     | 国际化 / RTL、布局容器与现有收起 API；已去除入口硬编码 primaryColor 覆盖。                                                    |
| Empty (19)、Spin (35)、Tag (20)、Alert (10)、Badge (4)、Progress (1)               | 现有空态、异步状态、标签、提示与进度展示。它们属于兼容显示保留项，不等同于复杂组件已全部替换。                                |
| Typography (19)、Card (4)、Avatar (5)、Image (4)、Divider (4)、Link (3)、Space (2) | 现有排版、卡片、头像、图片预览、分隔和排列；使用共享 CDS 表面 / 字体 / 间距覆盖，未另写业务组件适配器。                       |

该清单明确保留了现有组合交互与部分展示组件，因此 P5 不宣称“完全移除 Arco”。后续若要求彻底卸载，需要另行逐项替换上述真实用途；当前授权下优先完成既定视觉和安全迁移。

## 界面实施时的静态检查（2026-10-30，启动修复前）

- TypeScript：`node node_modules/typescript/bin/tsc --noEmit --pretty false` 通过，退出码 0。
- 仅本次界面相关修改文件：231 个 TS / TSX 文件执行 Oxlint，0 errors；103 条 warning 未作为通过失败依据，未扩大到无关历史整理。
- 277 个修改文件执行 Oxfmt 通过，使用 `--threads=1`；随后执行只读格式检查。
- 国际化类型生成及 `node scripts/check-i18n.js` 通过；工具步骤与团队全屏动作使用 13 种语言的翻译键。
- 未执行 Electron / WebUI / 浏览器预览、实际业务流程、打包、全量测试或覆盖率检查；用户明确要求先改完、暂不实际检查。
- P1 / P2 既有测试和预览通过记录仅代表其当时版本，不作为本轮修改的运行验证结论。
- 未创建本地提交，未推送远端；未修改日常安装版或用户数据。

## 依赖与验证边界

- 仅更新本地锁文件：缓存 Bun 执行 `install --lockfile-only --ignore-scripts`，未运行 postinstall 或原生模块构建。
- Bun 提示既有 `patches/7zip-bin@5.2.0.patch` 不适用于当前包；未改该历史补丁。
- 待实际集成检查：窗口 / 侧栏、真实输入与对话、组合浮层 / 设置保存、团队与登录。没有启动服务、浏览器或日常应用。
