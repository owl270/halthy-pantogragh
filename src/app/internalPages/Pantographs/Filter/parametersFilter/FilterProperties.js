import ShockPointIcon from "./icons/ShockPoint";
import ZigZagIcon from "./icons/ZigZag";
import HeightIcon from "./icons/Height";
import React from "react";
import ParamRangeSlider from "./ParamRangeSlider";

export default function (type) {

    // eslint-disable-next-line default-case
    switch (type) {
        case 'shock_point':
            return {
                icon: ShockPointIcon,
                title: 'Shock Point',
                content: <ParamRangeSlider/>,
                disabled: false
            }

        case 'zig_zag':
            return {
                icon: ZigZagIcon,
                title: 'Zig Zag',
                content: null,
                disabled: false
            }

        case 'height':
            return {
                icon: HeightIcon,
                title: 'Height',
                content: null,
                disabled: false
            }

    }

}