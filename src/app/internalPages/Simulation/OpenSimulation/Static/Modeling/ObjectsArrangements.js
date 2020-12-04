const W = 980
const H = 490

export const viewBox = `0 0 ${W} ${H}`



export const leftColumn = {
    w: 10,
    h: 0.75 * H,
    x: 0.2 * W,
    y: 0.25 * H
}



export const leftMessengerWireHeight = {
    w: 0,
    h: leftColumn.h,
    x: leftColumn.x - 0.15*W,
    y: leftColumn.y,
    // input: 'left_mwh'
}


export const leftStitchWire = {
    w: 200,
    h: 0,
    x: leftColumn.x + (leftColumn.w / 2) - 100,
    y: leftMessengerWireHeight.y + 31,
    d: 'left',
    dd: 'M' +
        '0 5' +
        'C' +
        '-20 33,' +
        '-90 33,' +
        '-95 33',
    gx: leftColumn.x,
    gy: leftColumn.y,
}



export const leftColumnDashLine = {
    w: leftMessengerWireHeight.x - leftColumn.x - 8,
    h: 0,
    x: leftColumn.x,
    y: leftColumn.y + leftColumn.h,
    d: 3
}

export const leftMessengerWireDashLine = {
    w: leftColumnDashLine.w,
    h: 0,
    x: leftColumn.x,
    y: leftColumn.y,
    d: 3
}

export const leftContactWireHeight = {
    w: 0,
    h: 0.6 * H,
    x: leftMessengerWireHeight.x + 0.045*W,
    y: 0.4 * H,
    input: 'left_cwh'
}

export const leftContactWireDashLine = {
    w: leftContactWireHeight.x - leftColumn.x - 8,
    h: 0,
    x: leftColumn.x,
    y: leftContactWireHeight.y
}






export const rightColumn = {
    w: 10,
    h: 0.75 * H,
    x: 0.88 * W,
    y: 0.25 * H
}