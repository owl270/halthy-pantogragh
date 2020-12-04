import * as React from "react"

function SvgComponent(props) {
    return (
        <svg viewBox="0 0 24 20" {...props}>
            <rect
                width={21}
                height={12}
                rx={6}
                transform="translate(0 8)"
                fill="#4285f4"
                opacity={0.5}
            />
            <circle cx={10} cy={10} r={10} transform="translate(4)" fill="#4285f4" />
            <path
                data-name="Path 7"
                d="M20 11h-7V4"
                fill="none"
                stroke="#383a3f"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={2}
            />
        </svg>
    )
}

export default SvgComponent
