# localizer.js 编写指南
## localizer.js 是存储需要翻译的元素以及对应翻译文本的js脚本

## 框架内置变量

框架内置了两个字典（Map）<br>
detect_elements: 存储需要翻译的HTML元素及翻译配置，以及替换模式下对应的翻译文本<br>
localization: 存储覆盖模式下对应的翻译文本<br>

### detect_elements

key: 字符串 CSS选择器<br>(如 ``"#wows-react-tooltip-body .Tooltip_accountPremium.Tooltip_activeAccountPremium"``)<br>用以选择要翻译的网页元素<br>
可参考文档 [菜鸟教程-CSS选择器](https://www.runoob.com/cssref/css-selectors.html) [Document.querySelectorAll](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll)<br><br>
value: js对象，结构如下<br>

    {
        isReplace: true,
        replaceArg: [
            ["Корабельный премиум аккаунт", "战舰世界高级账户"],
            ["дней", "天"],
            ["часов", "时"],
        ],
    }

isReplace: 布尔值 是否使用替换模式 必选<br>
replaceArg: 数组 替换模式使用的翻译文本 替换模式下必选<br>

### localization

key: 字符串 要替换的原始文本<br>
value: 字符串 对应的翻译文本<br>

---

## 添加翻译

### 覆盖模式

推荐在原文本不会变化的情况下使用，会对所有要翻译的网页元素的对应文本进行覆盖<br>

示例

    //添加HTML元素（覆盖模式）
    detect_elements.set(".Accordion_title", { isReplace: false });
    
    //添加翻译文本
    localization.set("За новогодними контейнерами!", "新年补给箱!");

效果图<br>
TODO<br><br>

### 替换模式

推荐在原文本存在时间等变量（如高账时间）的情况下使用，仅对该条添加的网页元素的对应文本进行替换<br>

示例

    //添加HTML元素（替换模式）
    detect_elements.set(
        "#wows-react-tooltip-body .Tooltip_accountPremium.Tooltip_activeAccountPremium",
        {
            isReplace: true,
            replaceArg: [
                ["Корабельный премиум аккаунт", "战舰世界高级账户"],
                ["дней", "天"],
                ["часов", "时"],
            ],
        }
    );

效果图<br>
TODO<br><br>