# 更新

2023/1/27

加入 nwjs 的框架
现在有个 exe 程式可以直接运行游戏了。
因为有 nw 的框架，可以有专门的存档文件，也能直接读写本地文件了。
但实时刷新游戏调试需要额外部署。
地图系统彻底完工，但还需要优化一下代码。
下一步就弄道具系统了。
如果你是通过 git 下载的，你需要到 nwjs 下载 sdk 包，把所有 dll 文件放到根目录下。

# workspace 内各文件夹说明：

-  Code
-  gamecode
-  modules
-  public
-  scripts

### Code

TypeScript 源文件所在的地方。
如果你对 JS 和 TS 不熟悉，就不用理。
Code 文件需要安装 node.js 环境才能经过脚本转换。

### gamecode

游戏主要代码与文本文件。
游戏运行需要的东西都在这里了！

文件的排序十分重要！加载顺序不对的话就会导致严重错误！
标了数字优先度的文件和文件夹绝对不能改名字！

### modules

js 插件文件。
需要程序优先读取的资料也会放这里。
游戏启动时，读取的顺序为 modules > gamecode

### public

打包好的游戏本体与 CSS、外部 js 插件和图片资源。

### scripts

环境脚本文件。如果你不会用 terminal 就不要动它。

# gamecode 文件

-  framework
   文件夹内的是程序主框架需要的设置脚本。绝对不能动也不能改名字！！

-  config
   文件夹内是设置文件。可以对游戏变量、系统设定等进行设置

-  data
   文件夹内是游戏资料。包括特征、地图等设定文件。

-  javascript
   文件夹内为 js 脚本文件。

-  gametwee
   文件夹内为 sugarcube 脚本与界面设计文件。

-  Actions
   文件夹内是动作指令文件。各指令的设定、脚本、还有文本。

-  Command
   文件夹内是传统指令模式的指令文件。各指令的设定、脚本、还有文本。

-  CharaSheet
   角色注册档案。

-  Kojo
   角色事件档案

## 系统流程

游戏启动时会按以下顺序加载脚本：

1. 挂在 header 中的外挂 js 脚本。如 jquery 这类功能插件。
2. module 内的 js 脚本。es6+的补充脚本，还有 ts 转换过来的游戏脚本都在这里。
3. gamecode 内的脚本。按名字排序，从最底层的文件夹开始读取。
4. 根据 GameSetup.twee 内的脚本，按顺序初始化。
5. 运行:: Start（也就是 GameStart.twee 文件）进入标题界面。
