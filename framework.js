//---------------------------------------------------框架----------------------------------------------------------
var localizer_mode = { mode: "Polling", interval: 500 };
var localizer_Debug = { showPerformanceData: false, showMutationTargetClassName: false };
var localizer_Debug_Execute_Start_Time = 0;

var localizer_Observe_ClassName_Now = "";
const localizer_Observe_ClassName_Set = new Set();

const localizer_MutationObserver_Config = { childList: true, subtree: true };
const localizer_Pass_Element_Id_Set = new Set();
const localizer_Pass_Element_ClassName_Set = new Set();

const localizer_Detect_Elements_CssSelector_Set = new Set();
const localizer_Detect_Elements_Override_Map = new Map();
const localizer_Detect_Elements_Replace_Map = new Map();

localizer_Observe_ClassName_Set.add("navalBase");
localizer_Observe_ClassName_Set.add("tasks");
localizer_Observe_ClassName_Set.add("members");
localizer_Observe_ClassName_Set.add("search");
localizer_Observe_ClassName_Set.add("new-recommendations");
localizer_Observe_ClassName_Set.add("treasury");
localizer_Observe_ClassName_Set.add("clan-wars");

localizer_Pass_Element_Id_Set.add("app");
localizer_Pass_Element_Id_Set.add("wows-react-tooltip-body");
localizer_Pass_Element_ClassName_Set.add("wru__Tooltip__header");
localizer_Pass_Element_ClassName_Set.add("clan-wars");
localizer_Pass_Element_ClassName_Set.add("TotalBalance_wrapper_1sZcM");
localizer_Pass_Element_ClassName_Set.add("History_noTransactionsWrapper_2q7z-");
localizer_Pass_Element_ClassName_Set.add("we-asset__text we-widget__text");
localizer_Pass_Element_ClassName_Set.add("ViewClanStars_wrapper_18UHq");
localizer_Pass_Element_ClassName_Set.add("ViewTreasury_tabContent_2MpE4");
localizer_Pass_Element_ClassName_Set.add("ViewClanBattles_wrapper_1uPSF");
localizer_Pass_Element_ClassName_Set.add("ViewClanWars_blurable_GNk-j ");
localizer_Pass_Element_ClassName_Set.add("MyWarTab_content_1d_Lf");
localizer_Pass_Element_ClassName_Set.add(
    "wru__Menu__toggle wru__Menu__isActive"
);
localizer_Pass_Element_ClassName_Set.add("LanguagesDialog_error_zZskG");

const Localizer_Init = function () {
    detect_elements.forEach((value, index, set) => {
        let cssSelector = value[0];
        let arg = value[1];
        if (!cssSelector || !arg) return;
        localizer_Detect_Elements_CssSelector_Set.add(cssSelector);
        if (!arg.isReplace) {
            let element_arg_list =
                localizer_Detect_Elements_Override_Map.get(cssSelector);
            if (!element_arg_list) {
                localizer_Detect_Elements_Override_Map.set(cssSelector, new Set());
                localizer_Detect_Elements_Override_Map.get(cssSelector).add(arg);
            } else {
                element_arg_list.add(arg);
            }
        } else {
            let element_arg_list =
                localizer_Detect_Elements_Replace_Map.get(cssSelector);
            if (!element_arg_list) {
                localizer_Detect_Elements_Replace_Map.set(cssSelector, new Set());
                localizer_Detect_Elements_Replace_Map.get(cssSelector).add(arg);
            } else {
                element_arg_list.add(arg);
            }
        }
    });

    if(localizer_mode.mode === "Event")
    {
        Localizer_Start_Event_Mode();
    }
    else if(localizer_mode.mode === "Polling")
    {
        Localizer_Start_Polling_Mode();
    }
};

const Localizer_Start_Event_Mode = function() {
    localizer_mutationObserver.observe(
        document.getRootNode(),
        localizer_MutationObserver_Config
    );
};

const Localizer_Start_Polling_Mode = function() {
    setInterval(Localizer_Work_Polling_Mode, localizer_mode.interval);
};

const Localizer_Work_Event_Mode = function (mutationList, observer) {
    if (localizer_Debug.showPerformanceData) { localizer_Debug_Execute_Start_Time = performance.now(); }
    for (let mutation of mutationList) {
        if (mutation.type !== "childList") continue;
        if (
            mutation.target.className !== localizer_Observe_ClassName_Now &&
            localizer_Observe_ClassName_Set.has(mutation.target.className)
        ) {
            observer.disconnect();
            observer.observe(mutation.target, localizer_MutationObserver_Config);
            return;
        }
        if (localizer_Debug.showMutationTargetClassName) console.log(mutation.target.className);
        if (
            !localizer_Pass_Element_Id_Set.has(mutation.target.id) &&
            !localizer_Pass_Element_ClassName_Set.has(mutation.target.className)
        )
            return;
        localizer_Detect_Elements_CssSelector_Set.forEach(
            (cssSelector, index, set) => {
                let targetElementsList = document.querySelectorAll(cssSelector);
                targetElementsList.forEach((element, index, list) => {
                    if (!element.innerText) return;
                    let override_arg_list =
                        localizer_Detect_Elements_Override_Map.get(cssSelector);
                    if (override_arg_list) {
                        override_arg_list.forEach((arg, index, list) => {
                            var temp_translated_str = translation.get(
                                arg.isReplaceHTML ? element.innerHTML : element.innerText
                            );
                            if (!temp_translated_str) return;
                            if (arg.isReplaceHTML) {
                                if (element.innerHTML === temp_translated_str) return;
                                element.innerHTML = temp_translated_str;
                            } else {
                                if (element.innerText === temp_translated_str) return;
                                element.innerText = temp_translated_str;
                            }
                        });
                    }
                    let replace_arg_list =
                        localizer_Detect_Elements_Replace_Map.get(cssSelector);
                    if (replace_arg_list) {
                        replace_arg_list.forEach((arg, index, list) => {
                            if (arg.isReplace !== true) return;
                            var temp_translated_str = arg.isReplaceHTML
                                ? element.innerHTML
                                : element.innerText;
                            arg.translation.forEach((value, index, array) => {
                                temp_translated_str = temp_translated_str.replaceAll(
                                    value[0],
                                    value[1]
                                );
                            });
                            if (arg.isReplaceHTML) {
                                if (element.innerHTML === temp_translated_str) return;
                                element.innerHTML = temp_translated_str;
                            } else {
                                if (element.innerText === temp_translated_str) return;
                                element.innerText = temp_translated_str;
                            }
                        });
                    }
                });
            }
        );
    }
    if (localizer_Debug.showPerformanceData) { console.log(`Localizer Work Time: ${ (performance.now() - localizer_Debug_Execute_Start_Time).toFixed(2)} ms`); }
};

const Localizer_Work_Polling_Mode = function () {
    if (localizer_Debug.showPerformanceData) { localizer_Debug_Execute_Start_Time = performance.now(); }
    localizer_Detect_Elements_CssSelector_Set.forEach(
        (cssSelector, index, set) => {
            let targetElementsList = document.querySelectorAll(cssSelector);
            targetElementsList.forEach((element, index, list) => {
                if (!element.innerText) return;
                let override_arg_list =
                    localizer_Detect_Elements_Override_Map.get(cssSelector);
                if (override_arg_list) {
                    override_arg_list.forEach((arg, index, list) => {
                        var temp_translated_str = translation.get(
                            arg.isReplaceHTML ? element.innerHTML : element.innerText
                        );
                        if (!temp_translated_str) return;
                        if (arg.isReplaceHTML) {
                            if (element.innerHTML === temp_translated_str) return;
                            element.innerHTML = temp_translated_str;
                        } else {
                            if (element.innerText === temp_translated_str) return;
                            element.innerText = temp_translated_str;
                        }
                    });
                }
                let replace_arg_list =
                    localizer_Detect_Elements_Replace_Map.get(cssSelector);
                if (replace_arg_list) {
                    replace_arg_list.forEach((arg, index, list) => {
                        if (arg.isReplace !== true) return;
                        var temp_translated_str = arg.isReplaceHTML
                            ? element.innerHTML
                            : element.innerText;
                        arg.translation.forEach((value, index, array) => {
                            temp_translated_str = temp_translated_str.replaceAll(
                                value[0],
                                value[1]
                            );
                        });
                        if (arg.isReplaceHTML) {
                            if (element.innerHTML === temp_translated_str) return;
                            element.innerHTML = temp_translated_str;
                        } else {
                            if (element.innerText === temp_translated_str) return;
                            element.innerText = temp_translated_str;
                        }
                    });
                }
            });
        }
    );
    if (localizer_Debug.showPerformanceData) { console.log(`Localizer Work Time: ${ (performance.now() - localizer_Debug_Execute_Start_Time).toFixed(2)} ms`); }
};

const localizer_mutationObserver = new MutationObserver(
    (mutationList, observer) => {
        setTimeout(() => {
            Localizer_Work_Event_Mode(mutationList, observer);
        }, 100);
    }
);

const detect_elements = new Set();
const translation = new Map();

//-------------------------------------------------框架结束--------------------------------------------------------

//工具代码
//获取网页元素
//document.querySelectorAll("#members-table-control-block-sticky-container .wru__ClanMember__memberRole")[0].innerText;

//-------------------------------------------------汉化代码--------------------------------------------------------



//-----------------------------------------------汉化代码结束--------------------------------------------------------

//初始化代码放在最后
Localizer_Init();