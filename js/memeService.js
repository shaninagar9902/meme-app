//MEME SERVICE JS
'use strict'

var gImg = [
    { id: 1, url: 'assets/1.jpg', keywords: ['president', 'trump', 'donald'], filter: 'mood' },
    { id: 2, url: 'assets/2.jpg', keywords: ['dog', 'puppies', 'puppy', 'kiss'], filter: 'cute' },
    { id: 3, url: 'assets/3.jpg', keywords: ['baby', 'sleep', 'dog'], filter: 'cute' },
    { id: 4, url: 'assets/4.jpg', keywords: ['cat', 'sleep', 'donald'], filter: 'cute' },
    { id: 5, url: 'assets/5.jpg', keywords: ['baby', 'angry', 'success'], filter: 'mood' },
    { id: 6, url: 'assets/6.jpg', keywords: ['confused', 'history', 'nerd'], filter: 'funny' },
    { id: 7, url: 'assets/7.jpg', keywords: ['baby', 'surprised', 'curious'], filter: 'black' },
    { id: 8, url: 'assets/8.jpg', keywords: ['wonka', 'sarcasm', 'willy'], filter: 'funny' },
    { id: 9, url: 'assets/9.jpg', keywords: ['kid', 'planning', 'evil'], filter: 'funny' },

    { id: 10, url: 'assets/10.jpg', keywords: ['president', 'barack', 'obama'], filter: 'black' },
    { id: 11, url: 'assets/11.jpg', keywords: ['kobe', 'kiss', 'basketball'], filter: 'black' },
    { id: 12, url: 'assets/12.jpg', keywords: ['haim', 'righteous', 'hecht'], filter: 'mood' },
    { id: 13, url: 'assets/13.jpg', keywords: ['leonardo', 'dicaprio', 'cheers'], filter: 'funny' },
    { id: 14, url: 'assets/14.jpg', keywords: ['matrix', 'sunglasses', 'serious'], filter: 'black' },
    { id: 15, url: 'assets/15.jpg', keywords: ['bruh', 'ring', 'lord'], filter: 'mood' },
    { id: 16, url: 'assets/16.jpg', keywords: ['cry', 'exciting', 'picard'], filter: 'funny' },
    { id: 17, url: 'assets/17.jpg', keywords: ['president', 'putin', 'russia'], filter: 'mood' },
    { id: 18, url: 'assets/18.jpg', keywords: ['toy story', 'woody', 'buzz'], filter: 'funny' },

    { id: 19, url: 'assets/19.jpg', keywords: ['shani', 'fly', 'cusco'], filter: 'us' },
    { id: 20, url: 'assets/20.jpg', keywords: ['shani', 'raz', 'medellin'], filter: 'us' },
    { id: 21, url: 'assets/21.jpg', keywords: ['shani', 'raz', 'orlando'], filter: 'us' },
    { id: 22, url: 'assets/22.jpg', keywords: ['shani', 'fly', 'medellin'], filter: 'us' },
    { id: 23, url: 'assets/23.jpg', keywords: ['shani', 'raz', 'cusco'], filter: 'us' },
    { id: 24, url: 'assets/24.jpg', keywords: ['shani', 'raz', 'pisac'], filter: 'us' },
    { id: 25, url: 'assets/25.jpg', keywords: ['shani', 'raz', 'lima'], filter: 'us' },
    { id: 26, url: 'assets/26.jpg', keywords: ['shani', 'raz', 'lima'], filter: 'us' },
    { id: 27, url: 'assets/27.jpg', keywords: ['jump', 'raz', 'playa de carmen'], filter: 'us' },
    { id: 28, url: 'assets/28.jpg', keywords: ['shani', 'horse', 'salento'], filter: 'us' },
    { id: 29, url: 'assets/29.jpg', keywords: ['jet ski', 'raz', 'medellin'], filter: 'us' },
    { id: 30, url: 'assets/30.jpg', keywords: ['shani', 'raz', 'cusco'], filter: 'us' },

    { id: 31, url: 'assets/31.jpg', keywords: ['julia', 'mountain', 'dance'], filter: 'mood' },
    { id: 32, url: 'assets/32.jpg', keywords: ['dance', 'africa', 'kids'], filter: 'black' },
    { id: 33, url: 'assets/33.jpg', keywords: ['evil', 'dr', 'austin'], filter: 'funny' },
    { id: 34, url: 'assets/34.jpg', keywords: ['oprah', 'winfrey', 'sing'], filter: 'black' },
    { id: 35, url: 'assets/35.jpg', keywords: ['puppy', 'stretching', 'chihuahua'], filter: 'funny' }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: 'Top text', size: 40, color: '#ffffff', strokeColor: '#000000', align: 'center', font: 'Impact', x: 0, y: 0, rotate: 0 },
        { txt: 'Bottom text', size: 40, color: '#ffffff', strokeColor: '#000000', align: 'center', font: 'Impact', x: 0, y: 0, rotate: 0 }
    ]
}

var gKeywordSearchCountMap = { 'Mood': 12, 'Funny': 16, 'Us': 10, 'Cute': 14, 'Black': 6 }

function getImgs() {
    let imgs = gImg
    if (gFilterBy !== 'all') {
        imgs = imgs.filter(img => img.filter === gFilterBy)
    }
    if (gSearchText) {
        imgs = imgs.filter(img => {
            return img.keywords.some(kw => kw.toLowerCase().includes(gSearchText)) ||
                img.filter.toLowerCase().includes(gSearchText)
        })
    }
    return imgs
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSearchText(txt) {
    gSearchText = txt.toLowerCase()
}

function getMeme() {
    return gMeme
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function addLine() {
    gMeme.lines.push({ txt: 'Text', size: 20, color: '#ffffff', strokeColor: '#000000', align: 'center', font: 'Impact', y: 0 })
}

function switchLine() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = 1
    } else {
        gMeme.selectedLineIdx = 0
    }
}

function getLineAtPos(x, y) {
    return gMeme.lines.findIndex(line =>
        y > line.y - line.size && y < line.y + line.size
    )
}

function selectLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function toggleAlign() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (line.align === 'left') { line.align = 'center' }
    else if (line.align === 'center') { line.align = 'right' }
    else if (line.align === 'right') { line.align = 'left' }
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function moveLine(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff
}

function saveMeme() {
    const dataUrl = gElCanvas.toDataURL()
    const memes = loadFromStorage('memes') || []
    memes.push(dataUrl)
    saveToStorage('memes', memes)

}

function getKeywords() {
    return Object.keys(gKeywordSearchCountMap)
}

function addSticker(emoji) {
    gMeme.lines.push({ txt: emoji, size: 40, color: '#ffffff', strokeColor: '#000000', font: 'Arial', align: 'center', y: 0 })
}

function setLinePos(x, y) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.x = x
    line.y = Math.max(line.size, Math.min(y, gElCanvas.height - 10))
}

function isOnResizeHandle(x, y) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const handleX = gElCanvas.width - 10
    const handleY = line.y - line.size
    return x >= handleX && x <= handleX + 10 &&
        y >= handleY && y <= handleY + 10
}

function isOnRotateHandle(x, y) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const handleY = line.y - line.size
    return x >= 0 && x <= 10 &&
        y >= handleY && y <= handleY + 10
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}