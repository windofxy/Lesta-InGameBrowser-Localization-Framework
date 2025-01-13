//兵工厂
detect_elements.set(".TopPanel_titleCategory", { isReplace: false });
detect_elements.set(".PageHeader_couponText", { isReplace: false });
detect_elements.set(".PageHeader_goldText", { isReplace: false });
detect_elements.set(".Accordion_title", { isReplace: false });
detect_elements.set(".PremiumAccountLink_accountPremiumText", {
    isReplace: true,
    replaceArg: [
        ["д", "天"],
        ["ч", "时"],
    ],
});

detect_elements.set("#wows-react-tooltip-body .Tooltip_headerTitle", {
    isReplace: false,
});
detect_elements.set("#wows-react-tooltip-body .Tooltip_defaultTooltipBody", {
    isReplace: false,
});
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

detect_elements.set(".RandomBundle_title span", { isReplace: false });
detect_elements.set(".RandomBundle_preTitle", { isReplace: false });
detect_elements.set(".Layouts_entityWrapper", { isReplace: false });
detect_elements.set(".Layouts_buttonWrapper span", { isReplace: false });
detect_elements.set(".Layouts_purchasedWrapper.Layouts_purchasedBlock div", {
    isReplace: false,
});
detect_elements.set(".BundleType_wrapper.BundleType_small", {
    isReplace: false,
});
detect_elements.set(".Timer_timer.OfferMark_timerText", {
    isReplace: true,
    replaceArg: [["день", "天"]],
});
detect_elements.set(".OfferMark_blockInfo.armory__auto-bundle_limit", {
    isReplace: true,
    replaceArg: [["Вам доступно", "可购买数量"]],
});

localization.set("Уголь", "煤");
localization.set("Рекомендованное", "推荐");
localization.set("Купоны", "优惠券");
localization.set("Купить дублоны", "购买金币");
localization.set("За новогодними контейнерами!", "新年补给箱!");
localization.set("Новогодний", "新年");
localization.set("Контейнер", "补给箱");
localization.set("Премиум контейнер", "大型补给箱");
localization.set("2025&nbsp;ед.&nbsp;угля", "2025&nbsp;煤");
localization.set("Периодичный случайный набор", "周期性随机奖励");
localization.set("Имущество получено", "已经购买");
localization.set("Купить", "购买");
localization.set(
    "Купить дни Корабельного премиум аккаунта",
    "购买战舰世界高级账号的天数"
);
localization.set(
    "Дублоны, дни Корабельного премиум аккаунта, <br>кредиты и&nbsp;другие наборы.",
    "达布隆，用来购买战舰世界高级账户，以及其他物品"
);
localization.set(
    '<div class="Tooltip_defaultTooltipDescriptionTitle">На&nbsp;что потратить</div>Особые и&nbsp;премиум корабли, а&nbsp;также&nbsp;другое имущество в&nbsp;Адмиралтействе.',
    '<div class="Tooltip_defaultTooltipDescriptionTitle">可以购买什么</div>特殊和加值战舰，以及海军部的其他财产'
);

//造船厂
detect_elements.set(".Stage_title_399UV", {
    isReplace: true,
    replaceArg: [["Этап", "阶段"]],
});
detect_elements.set(
    "#wows-react-tooltip-body .RewardTooltip_header_2zig2",
    { isReplace: true, replaceArg: [["Награда за", ""], ["-й", ""], ["этап", "阶段达成奖励"]] }
);
detect_elements.set(
    "#wows-react-tooltip-body .RewardShipTooltip_header_2K3A6",
    { isReplace: true, replaceArg: [["Особая награда за", ""], ["-й", ""], ["этап", "阶段达成特别奖励"], ["Финальная награда", "终极奖励"]] }
);

//军团
detect_elements.set(
    "#wows-react-tooltip-body .ViewSupply_buildingTooltipHeaderText_3jRX7 div",
    { isReplace: true, replaceArg: [["Казначейство", "财政部"], ["Улучшений", "升级"], ["из", "/"]] }
);
detect_elements.set("#wows-react-tooltip-body .wru__Tooltip__body", { isReplace: false });
detect_elements.set("#wows-react-tooltip-body .wru__Tooltip__footer.wru__Tooltip__left", { isReplace: false });

localization.set("Позволяет распределять ресурсы клана и&nbsp;регулярные награды.", "允许分配军团资源和定期奖励");
localization.set("Перейти к строению", "进入大楼");