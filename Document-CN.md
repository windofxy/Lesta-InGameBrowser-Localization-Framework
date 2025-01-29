# localizer.js 编写指南
## localizer.js 是存储需要翻译的元素以及对应翻译文本的js脚本

可参考项目 [InGameBrowserLocalizer](https://github.com/windofxy/Lesta-InGameBrowser-Localization-Framework-Public/tree/main/InGameBrowserLocalizer) 文件夹下的 [localizer-example.js](https://github.com/windofxy/Lesta-InGameBrowser-Localization-Framework-Public/blob/main/InGameBrowserLocalizer/localizer-example.js) 文件进行食用<br>

## 准备工作

以指定的格式创建localizer.js文件<br>

```javascript
//***替换为要本地化的模块名，避免汉化内容多次重复加载浪费性能
if (!window.__localizer_***_loaded__) {
    window.__localizer_***_loaded__ = true;
    let detect_elements = window.__localizer__.detect_elements;
    let translation = window.__localizer__.translation;
    let Localizer_Init = window.__localizer__.Localizer_Init;

    //下面开始写本地化内容


    //最后运行初始化函数让框架载入本地化内容
    Localizer_Init();
}
```

## 框架内置变量

框架内置了两个集合（Set）<br>
`detect_elements`: 存储需要翻译的HTML元素及翻译配置，以及替换模式下对应的翻译文本<br>
`translation`: 存储覆盖模式下对应的翻译文本<br>

### detect_elements

数值以格式为`[key ,value]`的数组作为值存储<br>
`key`: 字符串 CSS选择器<br>(如 ``"#wows-react-tooltip-body .Tooltip_accountPremium.Tooltip_activeAccountPremium"``)<br>用以选择要翻译的网页元素<br><br>
可参考文档<br>
[菜鸟教程-CSS选择器](https://www.runoob.com/cssref/css-selectors.html)<br>
[Document.querySelectorAll](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)<br><br>
`value`: js对象，结构如下<br>

```javascript
{
    isReplace: true,
    isReplaceHTML: true,
    translation: [
        ["Корабельный премиум аккаунт", "战舰世界高级账户"],
        ["дней", "天"],
        ["часов", "时"],
    ],
}
```

`isReplace`: 布尔值 是否使用替换模式 可选 不填默认不使用替换模式<br>
`isReplaceHTML`: 布尔值 选择替换InnerText还是InnerHTML 可选 不填默认替换InnerText<br>
`translation`: 数组 替换模式使用的翻译文本 替换模式下必选<br>

### translation

`key`: 字符串 要替换的原始文本<br>
`value`: 字符串 对应的翻译文本<br>

---

## 添加翻译

### 覆盖模式

推荐在原文本不会变化的情况下使用，会对所有要翻译的网页元素的对应文本进行覆盖<br>

示例<br>

```javascript
//添加HTML元素（覆盖模式）
detect_elements.add([".Accordion_title", {}]);

//添加翻译文本
translation.set("За новогодними контейнерами!", "新年补给箱!");
```

效果图<br>
![覆盖模式效果图](https://github.com/user-attachments/assets/eb97ea84-a1b7-48da-9ed4-ab2b431649ad)<br><br>

### 替换模式

推荐在原文本存在时间等变量（如高账时间）的情况下使用，仅对该条添加的网页元素的对应文本进行替换<br>

示例<br>

```javascript
//添加HTML元素（替换模式）
detect_elements.add([
    "#wows-react-tooltip-body .Tooltip_accountPremium.Tooltip_activeAccountPremium",
    {
        isReplace: true,
        translation: [
            ["Корабельный премиум аккаунт", "战舰世界高级账户"],
            ["дней", "天"],
            ["часов", "时"],
        ],
    }
]);
```

效果图<br>
![替换模式效果图](https://github.com/user-attachments/assets/421adaa0-c440-4946-b868-3b5e825fc97e)<br><br>

---

## 注意事项

### 正式上线的汉化文件请去除所有注释

否则脚本可能解析失败导致汉化失效<br>

### 原文不可设为空

否则会发生无限循环替换<br>

### 同条翻译文本内不可完全包含原文

否则会发生无限循环替换<br>

### CSS选择器应遵循最小范围原则

假设现在有两个元素的`class`都属于`c`，但他们的父级的`class`分别是`a`和`b`<br>
那么CSS选择器就应编写为`".a .c"`和`".b .c"`<br><br>
另一个例子<br>
如果两个元素的`class`和其父级的`class`完全相同，分别设为`this`，`parent`，但其中一个元素的文本还嵌套在一个`<p>`元素下<br>
那么CSS选择器应编写为`".parent .this p"`与`".parent .this"`，同时范围更大的后者应启用替换模式，以免发生误替换前者元素导致网页样式失效的情况发生<br>

---

## 测试

### 你可以将写好的汉化文件加上框架代码在外部浏览器上进行测试

打开项目根目录下的 [framework.js](https://github.com/windofxy/Lesta-InGameBrowser-Localization-Framework-Public/blob/main/framework.js) 文件，将汉化代码放在指定位置，再整个粘贴到浏览器控制台里即可运行

### 调试参数

将调试参数添加到汉化代码之前即可启用调试功能

`window.__localizer__.localizer_Debug.showPerformanceData` 布尔值 是否在浏览器控制台显示单次本地化更新耗费的时间<br>
`window.__localizer__.localizer_Debug.showMutationTargetClassName` 布尔值 在运行模式为事件模式时（详见下面进阶用法部分），在控制台显示触发事件元素的ClassName，用于在事件模式下某些元素无法汉化时反馈问题用

---

## 进阶用法

### 选择本地化框架的运行模式

你可以根据情况选择本地化框架的运行模式，从而改善本地化的性能及网页崩溃问题<br>

在汉化文件开头设置 `window.__localizer__.localizer_mode.mode` 字符串 设定运行模式 不使用时默认为轮询模式<br>

### 轮询模式 `window.__localizer__.localizer_mode.mode = "Polling"`

在此模式下，框架将会以固定的时间间隔更新网页，该间隔通过设置 `window.__localizer__.localizer_mode.interval` 进行调整<br>

`window.__localizer__.localizer_mode.interval` 数字 单位为ms，可选，不填默认为500<br>

该模式的性能损耗较为固定，本地化覆盖完全，但可能在不正确的时机更新网页导致网页崩溃或元素失效<br>

### 事件模式 `window.__localizer__.localizer_mode.mode = "Event"`

在此模式下，在特定元素进行更新时（由框架开发者进行设定），框架才会更新网页<br>

在网页更新不频繁时，该模式的性能消耗比`轮询模式`低，且导致网页崩溃或元素失效的概率更小，但本地化覆盖程度较`轮询模式`差，且在部分场景下由于网页更新频繁，框架执行频率较`轮询模式`可能高几倍甚至几十倍，导致大量性能消耗<br>

建议仅在轮询模式频繁导致网页崩溃，且通过调整CSS选择器也无法解决，等迫不得已的情况下才使用该模式

---

### 根据域名判断加载的网页，从而只选择部分文本加入译文集，减少性能浪费

可在浏览器F12控制台输入`console.log(window.location.host)`获取当前网页域名<br>

示例代码<br>

```javascript
//***替换为要本地化的模块名，避免汉化内容多次重复加载浪费性能
//添加域名判定
if (!window.__localizer_***_loaded__ && window.location.host === "clans.korabli.su") {
    window.__localizer_***_loaded__ = true;
    let detect_elements = window.__localizer__.detect_elements;
    let translation = window.__localizer__.translation;
    let Localizer_Init = window.__localizer__.Localizer_Init;

    //下面开始写本地化内容


    //最后运行初始化函数让框架载入本地化内容
    Localizer_Init();
}
```

---

### 使用正则表达式编写本地化内容

参考资料<br>
[菜鸟教程-正则表达式](https://www.runoob.com/regexp/regexp-tutorial.html)<br>
[JavaScript正则表达式替换指南：从入门到精通 (只需查看2.3 替换模式中的特殊变量部分)](https://www.oryoy.com/news/javascript-zheng-ze-biao-da-shi-ti-huan-zhi-nan-cong-ru-men-dao-jing-tong-jie-jue-ri-chang-bian-ma-n.html)<br>

正则表达式仅在替换模式下可用，可以解决文本生硬替换造成的语序问题，以及对含有可变内容的文本进行本地化<br>

示例代码<br>

```javascript
detect_elements.add([
    ".View_contentWrapper .View_mainContent .BundlePageHeader_headerWrapper .BundlePageHeader_preBundleTitle .BundlePageHeader_shipInfo",
    {
        isReplace: true,
        translation: [
            [/Эсминец (.*) уровня/g, "$1级驱逐舰"],
            [/Крейсер (.*) уровня/g, "$1级巡洋舰"],
            [/Линкор (.*) уровня/g, "$1级战列舰"],
            [/Авианосец (.*) уровня/g, "$1级航空母舰"],
            [/Подводная лодка (.*) уровня/g, "$1级潜艇"],
        ]
    }
]);
```

效果图<br>


---