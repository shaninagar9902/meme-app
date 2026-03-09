// GALLERY CONTROLLER JS
'use strict'

function onInitFavorites() {
    const memes = loadFromStorage('memes') || []
    const elContainer = document.querySelector('.select-img-container')
    elContainer.innerHTML = memes.map(meme => `
        <img 
            src="${meme}"
            class="square" 
            alt="Saved meme">`)
        .join('')
}

function renderGallery() {
    const imgs = getImgs()
    const elContainer = document.querySelector('.select-img-container')
    const strHTMLs = imgs.map(img => `
        <img 
            src="${img.url}"
            onclick="onSelectImg(${img.id})" 
            class="square" 
            alt="Meme">`)
        .join('')
    elContainer.innerHTML = strHTMLs
}

function renderKeywords() {
    const keywords = getKeywords()

    const elContainer = document.querySelector('.keywords-container')
    elContainer.innerHTML = keywords.map(keyword => `
        <span style="font-size: ${gKeywordSearchCountMap[keyword]}px"
        onclick="onKeywordClick('${keyword}')">
        ${keyword} </span>
        `).join('')
}