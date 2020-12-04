import * as React from "react";
import ClickOutHandler from "react-clickout-handler";

export function TabSpan({name, dismiss}) {
    return <>
        <span>
            {name}
            {typeof dismiss === "function" ? <div className="dismiss-tab" onClick={dismiss}>×</div> : null}
        </span>
    </>
}

export function AddSpan({adder}) {
    const [expandAddSpan, setExpandAddSpan] = React.useState(false)
    return <>
        <ClickOutHandler
            onClickOut={() => {
                setExpandAddSpan(false)
            }}
        >
            <div className={"add-span" + (expandAddSpan ? " rendered" : "")}>
                <div className="add-span-tab" onClick={() => {
                    setExpandAddSpan(!expandAddSpan)
                }}>+
                </div>
                <div className="add-span-container">
                    <ul>
                        <li onClick={() => {
                            adder('normal')
                        }}>New Span
                        </li>
                        <li onClick={() => {
                            adder('end')
                        }}>End Span
                        </li>
                    </ul>
                </div>
            </div>
        </ClickOutHandler>
    </>
}
