import * as React from "react"

function SvgComponent(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={36.924}
            height={43.566}
            viewBox="0 0 36.924 43.566"
            {...props}
        >
            <defs>
                <filter
                    id="prefix__a"
                    x={0}
                    y={0}
                    width={36.924}
                    height={43.566}
                    filterUnits="userSpaceOnUse"
                >
                    <feOffset dy={3} />
                    <feGaussianBlur stdDeviation={3} result="blur" />
                    <feFlood floodOpacity={0.161} />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <g filter="url(#prefix__a)">
                <path
                    data-name="Subtraction 168"
                    d="M18.461 31.566a.921.921 0 01-.84-.733 9.216 9.216 0 00-1.7-3.519 6.979 6.979 0 00-.658-.508 18.3 18.3 0 01-3.806-3.494A10.934 10.934 0 019 16.419C9 10.674 13.244 6 18.461 6s9.462 4.674 9.462 10.419a10.934 10.934 0 01-2.458 6.893 18.3 18.3 0 01-3.806 3.494 6.98 6.98 0 00-.658.508 9.217 9.217 0 00-1.7 3.519.918.918 0 01-.84.733zM16.209 20.5l2.227 2.452 2.226-2.452h-1.67v-7.353h1.67L18.435 10.7l-2.226 2.447h1.67V20.5z"
                    fill="#a17d48"
                />
            </g>
        </svg>
    )
}

export default SvgComponent
