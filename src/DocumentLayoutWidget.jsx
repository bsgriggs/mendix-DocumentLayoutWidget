import { createElement, useCallback } from "react";

import { BadgeSample } from "./components/BadgeSample";
import "./ui/DocumentLayoutWidget.css";

export function DocumentLayoutWidget(props) {
    const {
        documentlayoutwidgetType,
        documentlayoutwidgetValue,
        valueAttribute,
        onClickAction,
        style,
        bootstrapStyle
    } = props;
    const onClickHandler = useCallback(() => {
        if (onClickAction && onClickAction.canExecute) {
            onClickAction.execute();
        }
    }, [onClickAction]);

    return (
        <BadgeSample
            type={documentlayoutwidgetType}
            bootstrapStyle={bootstrapStyle}
            className={props.class}
            clickable={!!onClickAction}
            defaultValue={documentlayoutwidgetValue ? documentlayoutwidgetValue : ""}
            onClickAction={onClickHandler}
            style={style}
            value={valueAttribute ? valueAttribute.displayValue : ""}
        />
    );
}
