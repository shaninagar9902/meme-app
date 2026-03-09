//MAIN JS
'use strict'

let gCtx
let gElCanvas
var gSearchText = ''
var gFilterBy = 'all'
var gIsDragging = false
var gIsResizing = false
var gIsRotating = false
var gStickerStart = 0
var gStickers = ['😂', '❤️', '🔥', '👍', '😎', '🤣', '💀', '🎉']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gElCanvas.addEventListener('mousedown', onMouseDown)
    gElCanvas.addEventListener('mousemove', onMouseMove)
    gElCanvas.addEventListener('mouseup', onMouseUp)

    renderGallery()
    renderKeywords()
    renderStickerPicker()
}

function onSelectImg(imgId) {
    setImg(imgId)
    resizeCanvas()
    hideAll()
    renderMeme()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 180 //- 2
}

function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    console.log('dataUrl', dataUrl)

    elLink.href = dataUrl
    elLink.download = 'my-img'
}

function onSetLineText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImFlexible() {
    const randomIdx = Math.floor(Math.random() * gImg.length)
    const randomImg = gImg[randomIdx]

    gMeme.lines = [{ txt: 'Text', size: 40, color: '#ffffff', strokeColor: '#000000', align: 'center', font: 'Impact', x: 0, y: 0, rotate: 0 }]
    gMeme.selectedLineIdx = 0
    onSelectImg(randomImg.id)
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    const tempId = 999
    const existingIdx = gImg.findIndex(i => i.id === tempId)
    if (existingIdx !== -1) gImg.splice(existingIdx, 1)
    // gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    gImg.push({ id: tempId, url: img.src, keywords: [], filter: 'all' })
    setImg(tempId)
    resizeCanvas()
    hideAll()
    renderMeme()
}

function hideAll() {
    document.querySelector('.canvas-container').classList.remove('hidden')
    document.querySelector('.title').classList.add('hidden')
    document.querySelector('.select-img-container').classList.add('hidden')
    document.querySelector('.searchers').classList.add('hidden')
    document.querySelector('.keywords-container').classList.add('hidden')
    document.querySelector('.title-icon').classList.add('hidden-mobile')
    const elTitle = document.querySelector('.title')
    if (elTitle) elTitle.classList.add('hidden')
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const pageUrl = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`)
}

function onShareMeme() {
    gElCanvas.toBlob(blob => {
        const file = new File([blob], 'meme.jpg', { type: 'image/jpg' })
        navigator.share({
            title: 'Check out my meme!',
            files: [file]
        })
    })
}