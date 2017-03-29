let lines = {
    xt: null,
    xc: null,
    xb: null,
    yl: null,
    yc: null,
    yr: null,
}

// 置入参考线
for (let p in lines) {
    let node = lines[p] = document.createElement('div')

    node.classList.add('ref-line', p)
    node.style.cssText = `display:none;opacity:0.7;position:absolute;background:#4DAEFF;z-index:199111250;${p[0] === 'x' ? 'width:100%;height:1px;left:0;' : 'width:1px;height:100%;top:0;'}`

    // 挂上一些辅助方法
    node.show   = function () {
        this.style.display = 'block'
    }
    node.hide   = function () {
        this.style.display = 'none'
    }
    node.isShow = function () {
        return this.style.display !== 'none'
    }
    document.body.appendChild(node)
}

class RefLine {
    constructor(options = {}) {
        this.options = Object.assign({
            gap: 3
        }, options)
    }

    /**
     * @param dragNode {Element} 拖拽元素的原生node
     * @param checkNodes {String|Element} 选择器 或者 原生node集合
     */
    check(dragNode, checkNodes) {
        checkNodes   = typeof checkNodes === 'string' ? document.querySelectorAll(checkNodes) : checkNodes
        let dragRect = dragNode.getBoundingClientRect()

        this.uncheck()
        Array.from(checkNodes).forEach((item) => {
            item.classList.remove('ref-line-active')

            if (item === dragNode) return
            let {top, height, bottom, left, width, right} = item.getBoundingClientRect()
            let dragWidthHalf                             = dragRect.width / 2
            let itemWidthHalf                             = width / 2
            let dragHeightHalf                            = dragRect.height / 2
            let itemHeightHalf                            = height / 2

            let conditions = {
                top: [
                    // xt-top
                    {
                        isNearly : this._isNearly(dragRect.top, top),
                        lineNode : lines.xt,
                        lineValue: top,
                        dragValue: top
                    },
                    // xt-bottom
                    {
                        isNearly : this._isNearly(dragRect.bottom, top),
                        lineNode : lines.xt,
                        lineValue: top,
                        dragValue: top - dragRect.height
                    },
                    // xc
                    {
                        isNearly : this._isNearly(dragRect.top + dragHeightHalf, top + itemHeightHalf),
                        lineNode : lines.xc,
                        lineValue: top + itemHeightHalf,
                        dragValue: top + itemHeightHalf - dragHeightHalf
                    },
                    // xb-top
                    {
                        isNearly : this._isNearly(dragRect.bottom, bottom),
                        lineNode : lines.xb,
                        lineValue: bottom,
                        dragValue: bottom - dragRect.height
                    },
                    // xb-bottom
                    {
                        isNearly : this._isNearly(dragRect.top, bottom),
                        lineNode : lines.xb,
                        lineValue: bottom,
                        dragValue: bottom
                    },
                ],

                left: [
                    // yl-left
                    {
                        isNearly : this._isNearly(dragRect.left, left),
                        lineNode : lines.yl,
                        lineValue: left,
                        dragValue: left
                    },
                    // yl-right
                    {
                        isNearly : this._isNearly(dragRect.right, left),
                        lineNode : lines.yl,
                        lineValue: left,
                        dragValue: left - dragRect.width
                    },
                    // yc
                    {
                        isNearly : this._isNearly(dragRect.left + dragWidthHalf, left + itemWidthHalf),
                        lineNode : lines.yc,
                        lineValue: left + itemWidthHalf,
                        dragValue: left + itemWidthHalf - dragWidthHalf
                    },
                    // yr-left
                    {
                        isNearly : this._isNearly(dragRect.right, right),
                        lineNode : lines.yr,
                        lineValue: right,
                        dragValue: right - dragRect.width
                    },
                    // yr-right
                    {
                        isNearly : this._isNearly(dragRect.left, right),
                        lineNode : lines.yr,
                        lineValue: right,
                        dragValue: right
                    },
                ]
            }

            for (let key in conditions) {
                // 遍历符合的条件并处理
                conditions[key].forEach((condition) => {
                    if (!condition.isNearly) return

                    item.classList.add('ref-line-active')
                    dragNode.style[key]           = `${condition.dragValue}px`
                    condition.lineNode.style[key] = `${condition.lineValue}px`
                    condition.lineNode.show()
                })
            }
        })
    }

    uncheck() {
        Object.values(lines).forEach((item) => item.hide())
        Array.from(document.querySelectorAll('.ref-line-active')).forEach((item) => item.classList.remove('ref-line-active'))
    }

    _isNearly(dragValue, targetValue) {
        return Math.abs(dragValue - targetValue) <= this.options.gap
    }
}

module.exports = RefLine