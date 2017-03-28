let lines = {
    xt: null,
    xm: null,
    xb: null,
    yl: null,
    ym: null,
    yt: null,
}

// 置入参考线
for (let p in lines) {
    let node = lines[p] = document.createElement('div')

    node.classList.add('ref-line', p)
    node.style.cssText = `display:none;position:absolute;background:#4DAEFF;${p[0] === 'x' ? 'width:100%;height:2px;left:0;' : 'width:2px;height:100%;top:0;'}`
    document.body.appendChild(node)
}

class RefLine {
    constructor(options = {}) {
        options = Object.assign({
            width: '20px'
        }, options)
    }

    check(dragNode, checkNodes, gap) {
        let dragRect = dragNode.getBoundingClientRect()

        Array.from(checkNodes).forEach((item) => {
            if (item === dragNode) return
            let {top, left} = item.getBoundingClientRect()

            // TODO ZH 3/28/17
            let isNearly = dragRect.left - left >= gap

            let plusGap   = dragRect.left + gap
            let reduceGap = dragRect.left - gap
            if (plusGap === dragRect.left || reduceGap === dragRect.left) {
                dragNode.style.left = lines.yl.style.left = `${left}px`
                lines.yl.style.display = 'block'
            } else {
                lines.yl.style.display = 'none'
            }
        })
    }

    uncheck() {

    }
}