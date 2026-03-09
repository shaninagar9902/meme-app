//MEME CONTROLLER JS
'use strict'

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderGallery()
}

function onSetSearch(txt) {
    setSearchText(txt)
    renderGallery()
}

function onSetLineColor(color) {
    setLineColor(color)
    renderMeme()
}

function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onToggleAlign() {
    toggleAlign()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onMoveLine(diff) {
    moveLine(diff)
    renderMeme()
}

function onAddSticker(emoji) {
    addSticker(emoji)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

function onSaveMeme() {
    saveMeme()
}

function toggleShareMenu() {
    document.querySelector('.modal-overlay').classList.toggle('hidden')
}

function scrollStickers(diff) {
    gStickerStart = (gStickerStart + diff + gStickers.length) % gStickers.length
    renderStickerPicker()
}

function renderStickerPicker() {
    const container = document.querySelector('.sticker-display')
    container.innerHTML = ''
    for (let i = 0; i < 4; i++) {
        const idx = (gStickerStart + i) % gStickers.length
        const span = document.createElement('span')
        span.textContent = gStickers[idx]
        span.onclick = () => onAddSticker(gStickers[idx])
        container.appendChild(span)
    }
}

function onMouseDown(event) {
    const scaleX = gElCanvas.width / gElCanvas.offsetWidth
    const scaleY = gElCanvas.height / gElCanvas.offsetHeight
    const x = event.offsetX * scaleX
    const y = event.offsetY * scaleY

    if (isOnRotateHandle(x, y)) {
        gIsRotating = true
        return
    }

    if (isOnResizeHandle(x, y)) {
        gIsResizing = true
        return
    }

    const lineIdx = getLineAtPos(x, y)
    if (lineIdx !== -1) {
        gIsDragging = true
        selectLine(lineIdx)
    }
}

function onMouseUp() {
    gIsDragging = false
    gIsResizing = false
    gIsRotating = false
}

function onMouseMove(event) {
    if (gIsRotating) {
        const x = event.offsetX
        const y = event.offsetY
        const line = gMeme.lines[gMeme.selectedLineIdx]
        const centerX = gElCanvas.width / 2
        const centerY = line.y
        line.rotate = Math.atan2(y - centerY, x - centerX) // Por fin
        renderMeme()
        return
    }

    if (gIsResizing) {
        const x = event.offsetX
        const line = gMeme.lines[gMeme.selectedLineIdx]
        line.size = Math.max(10, x / 5) // Por fin
        renderMeme()
        return
    }

    if (!gIsDragging) return
    const x = event.offsetX
    const y = event.offsetY
    setLinePos(x, y)
    renderMeme()
}

function onKeywordClick(keyword) {
    setSearchText(keyword)
    gKeywordSearchCountMap[keyword]++
    renderGallery()
    renderKeywords()
}

function onSwitchLine() {
    switchLine()
    const line = gMeme.lines[gMeme.selectedLineIdx]
    document.querySelector('input[type="text"]').value = line.txt
    document.querySelector('input[type="color"]').value = line.color
    renderMeme()
}

function onCanvasClick(event) {
    const x = event.offsetX
    const y = event.offsetY
    const lineIdx = getLineAtPos(x, y)
    if (lineIdx !== -1) {
        selectLine(lineIdx)
        renderMeme()
    }
}

function drawText(text, x, y, size, color, font, align, rotate, strokeColor) {
    gCtx.save()
    gCtx.translate(x, y)
    gCtx.rotate(rotate || 0)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor || 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align

    gCtx.strokeText(text, 0, 0)
    gCtx.fillText(text, 0, 0)
    gCtx.restore()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    const selectedImg = gImg.find(currImg => currImg.id === meme.selectedImgId)

    img.src = selectedImg.url
    img.onload = () => {
        const canvasW = gElCanvas.width
        const canvasH = gElCanvas.width
        gElCanvas.height = canvasH

        const imgRatio = img.naturalWidth / img.naturalHeight
        const canvasRatio = canvasW / canvasH
        let srcX, srcY, srcW, srcH

        if (imgRatio > canvasRatio) {
            srcH = img.naturalHeight
            srcW = img.naturalHeight * canvasRatio
            srcX = (img.naturalWidth - srcW) / 2
            srcY = 0
        } else {
            srcW = img.naturalWidth
            srcH = img.naturalWidth / canvasRatio
            srcX = 0
            srcY = (img.naturalHeight - srcH) / 2
        }
        gCtx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, canvasW, canvasH)

        // const line = meme.lines[0]
        // drawText(line.txt, gElCanvas.width / 2, 50, line.size, line.color)

        meme.lines.forEach((line, idx) => {
            if (line.y === 0) {
                line.y = idx === 0 ? line.size + 10 : gElCanvas.height - 20
            }
            const y = line.y
            if (idx === gMeme.selectedLineIdx) {
                gCtx.strokeStyle = 'yellow'
                gCtx.strokeRect(0, y - line.size, gElCanvas.width, line.size + 10)
                gCtx.fillStyle = 'yellow'
                gCtx.fillRect(gElCanvas.width - 10, y - line.size, 10, 10)
                gCtx.fillStyle = 'blue'
                gCtx.fillRect(0, y - line.size, 10, 10)
            }
            let x = gElCanvas.width / 2
            if (line.align === 'left') x = 10
            else if (line.align === 'right') x = gElCanvas.width - 10
            drawText(line.txt, x, y, line.size, line.color, line.font, line.align, line.rotate, line.strokeColor)
            line.y = y
            line.x = gElCanvas.width / 2
        });
    }
}