module.exports = function ({
    fontStyles,
    bpMin = "40rem",
    bpMax = "64rem",
    bpFallback = "48rem",
}) {
    return function ({ addBase, addComponents }) {
        Object.values(fontStyles).forEach((setting) => {
            if (setting.hasOwnProperty("styles")) {
                let baseStyles = {};
                let baseStylesMedia = {};
                let componentStyles = {};

                for (const [key, value] of Object.entries(setting.styles)) {
                    switch (key) {
                        case "fontSize":
                        case "lineHeight":
                        case "marginBottom":
                            if (Array.isArray(value)) {
                                baseStyles[key] = value[0];
                                baseStylesMedia[key] = value[1];
                                componentStyles[key] = `clamp(${
                                    value[0]
                                }, calc(${value[0]} + (${parseFloat(
                                    value[1]
                                )} - ${parseFloat(
                                    value[0]
                                )}) * ((100vw - ${bpMin}) / (${parseFloat(
                                    bpMax
                                )} - ${parseFloat(bpMin)}))), ${value[1]})`;
                            } else {
                                baseStyles[key] = value;
                            }
                            break;
                        default:
                            baseStyles[key] = value;
                    }
                    baseStyles[`@media (min-width: ${bpFallback})`] =
                        baseStylesMedia;
                    addBase({
                        [`${setting.selectors.join(", ")}`]: baseStyles,
                    });
                    addComponents({
                        [`${setting.selectors.join(", ")}`]: componentStyles,
                    });
                }
            }

            if (setting.hasOwnProperty("prefixedStyles")) {
                let baseStyles = {};
                let baseStylesMedia = {};
                let componentStyles = {};

                setting.prefixedStyles.forEach(function (prefixedSetting) {
                    for (const [key, value] of Object.entries(
                        prefixedSetting.styles
                    )) {
                        switch (key) {
                            case "fontSize":
                            case "lineHeight":
                            case "marginBottom":
                                if (Array.isArray(value)) {
                                    baseStyles[key] = value[0];
                                    baseStylesMedia[key] = value[1];
                                    componentStyles[key] = `clamp(${
                                        value[0]
                                    }, calc(${value[0]} + (${parseFloat(
                                        value[1]
                                    )} - ${parseFloat(
                                        value[0]
                                    )}) * ((100vw - ${bpMin}) / (${parseFloat(
                                        bpMax
                                    )} - ${parseFloat(bpMin)}))), ${value[1]})`;
                                } else {
                                    baseStyles[key] = value;
                                }
                                break;
                            default:
                                baseStyles[key] = value;
                        }
                        baseStyles[`@media (min-width: ${bpFallback})`] =
                            baseStylesMedia;
                        addBase({
                            [`${setting.selectors
                                .map((i) => prefixedSetting.prefix + i)
                                .join(", ")}`]: baseStyles,
                        });
                        addComponents({
                            [`${setting.selectors
                                .map((i) => prefixedSetting.prefix + i)
                                .join(", ")}`]: componentStyles,
                        });
                    }
                });
            }

            if (setting.hasOwnProperty("postfixedStyles")) {
                let baseStyles = {};
                let baseStylesMedia = {};
                let componentStyles = {};

                setting.postfixedStyles.forEach(function (postfixedSetting) {
                    for (const [key, value] of Object.entries(
                        postfixedSetting.styles
                    )) {
                        switch (key) {
                            case "fontSize":
                            case "lineHeight":
                            case "marginBottom":
                                if (Array.isArray(value)) {
                                    baseStyles[key] = value[0];
                                    baseStylesMedia[key] = value[1];
                                    componentStyles[key] = `clamp(${
                                        value[0]
                                    }, calc(${value[0]} + (${parseFloat(
                                        value[1]
                                    )} - ${parseFloat(
                                        value[0]
                                    )}) * ((100vw - ${bpMin}) / (${parseFloat(
                                        bpMax
                                    )} - ${parseFloat(bpMin)}))), ${value[1]})`;
                                } else {
                                    baseStyles[key] = value;
                                }
                                break;
                            default:
                                baseStyles[key] = value;
                        }
                        baseStyles[`@media (min-width: ${bpFallback})`] =
                            baseStylesMedia;
                        addBase({
                            [`${setting.selectors
                                .map((i) => i + postfixedSetting.postfix)
                                .join(", ")}`]: baseStyles,
                        });
                        addComponents({
                            [`${setting.selectors
                                .map((i) => i + postfixedSetting.postfix)
                                .join(", ")}`]: componentStyles,
                        });
                    }
                });
            }
        });
    };
};

