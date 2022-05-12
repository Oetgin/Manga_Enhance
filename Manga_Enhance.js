// ==UserScript==
// @name         Manga enhance
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Improves manga sites' reading experience
// @author       Oetgin
// @match        https://manga-tx.com/*
// @match        https://www.webtoons.com/*
// @icon         https://github.com/Oetgin/Manga_Enhance/blob/main/Manga_enhance.png?raw=true.png
// @grant        none
// ==/UserScript==



function dezoom(dezoomValue){
        const readingContent = document.getElementsByClassName("reading-content")[0];
        readingContent.style.zoom = dezoomValue;
}

function brighten(brightnessValue){
        const readingContent = document.getElementsByClassName("reading-content")[0];
        readingContent.style.filter = `brightness(${brightnessValue})`
}


function createMenu(){

    var defaultZoom = localStorage.getItem("zoom"); // Get previous used zoom
    var defaultBrightness = localStorage.getItem("brightness"); // Get previous used brightness

    dezoom(defaultZoom/100+0.1); // Dezoom to previous zoom value
    brighten(defaultBrightness/100)

    // The div for the menu
    var menuDiv = document.createElement("div");
    menuDiv.class = "slidecontainer";
    menuDiv.style.position = "fixed";
    menuDiv.style.background = "#353535";
    menuDiv.style.right = "50px";
    menuDiv.style.bottom = 0;
    menuDiv.style.width = "275px";
    menuDiv.style.padding = "7.5px";

    // The "Manga Enhance" label
    var logoLabel = document.createElement("span");
    logoLabel.innerHTML = "---- Manga Enhance ----";
    logoLabel.style.fontFamily = "Monospace";
    logoLabel.style.color = "white";
    logoLabel.style.paddingLeft = "40px";
    logoLabel.style.paddingRight = "40px";

    // The "Zoom :" label
    var zoomLabel = document.createElement("span");
    zoomLabel.innerHTML = "Zoom : ";
    zoomLabel.style.fontFamily = "Monospace";
    zoomLabel.style.color = "white";

    // The slider for the zoom value
    var zoomSlider = document.createElement("input");
    zoomSlider.type = "range";
    zoomSlider.class = "slider";
    zoomSlider.defaultValue = defaultZoom

    // The label for the zoom value
    var showZoom = document.createElement("span");
    showZoom.style.fontFamily = "Monospace";
    showZoom.style.color = "white";
    showZoom.style.paddingLeft = "10px";
    showZoom.style.display = "inline-block"

    // The "Brightness :" label
    var brightnessLabel = document.createElement("span");
    brightnessLabel.innerHTML = "Brightness : ";
    brightnessLabel.style.fontFamily = "Monospace";
    brightnessLabel.style.color = "white";

    // The slider for the brightness value
    var brightnessSlider = document.createElement("input");
    brightnessSlider.type = "range";
    brightnessSlider.class = "slider";
    brightnessSlider.defaultValue = defaultBrightness

    // The label for the brightness value
    var showBrightness = document.createElement("span");
    showBrightness.style.fontFamily = "Monospace";
    showBrightness.style.color = "white";
    showBrightness.style.paddingLeft = "10px";

    // Append the elements to the document
    document.body.appendChild(menuDiv);
    menuDiv.appendChild(logoLabel);
    menuDiv.appendChild(zoomLabel);
    menuDiv.appendChild(zoomSlider);
    menuDiv.appendChild(showZoom);
    menuDiv.appendChild(brightnessLabel);
    menuDiv.appendChild(brightnessSlider);
    menuDiv.appendChild(showBrightness);

    showZoom.innerHTML = zoomSlider.value; // Display the default zoom slider value
    showBrightness.innerHTML = brightnessSlider.value // Display the default brightness slider value

    // Update the current zoom slider value (each time you drag the slider handle)
    zoomSlider.oninput = function() {
        showZoom.innerHTML = this.value;
        dezoom(this.value/100+0.1);
        localStorage.setItem("zoom", this.value)
    }

    // Update the current brightness slider value (each time you drag the slider handle)
    brightnessSlider.oninput = function() {
        showBrightness.innerHTML = this.value;
        brighten(this.value/100);
        localStorage.setItem("brightness", this.value)
    }
}



(function() {
    'use strict';

    console.log("█▄ ▄█ ▄▀▄ █▄ █ ▄▀  ▄▀▄\n█ ▀ █ █▀█ █ ▀█ ▀▄█ █▀█\n\n██▀ █▄ █ █▄█ ▄▀▄ █▄ █ ▄▀▀ ██▀\n█▄▄ █ ▀█ █ █ █▀█ █ ▀█ ▀▄▄ █▄▄")
    console.log("https://github.com/Oetgin/Manga_Enhance")


    // Manga-TX code
    // When reading mangas
    try {
        // Remove banner
        const elements = document.getElementsByClassName("c-sub-header-nav with-border");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }

        // Remove gap between images
        const imgs = document.getElementsByClassName("page-break");
        for (let i=0; i<imgs.length; i++){
            imgs[i].children[0].style.margin = 0;
        }

        // Create menu
        createMenu();
    } catch {}

    // When on a manga chapter list page
    try {
        // Click the "read first" button when mouse hovers over it
        document.getElementById("btn-read-last").addEventListener("mouseover", ()=>{
            document.getElementById("btn-read-last").click();
        })} catch {}

    // Webtoons code
    try{
        // Dezoom
        document.getElementById("_imageList").style.zoom = 0.7;
        document.getElementById("_imageList").style.width = "1602px";
    } catch {}
})();



window.onscroll = function(ev) {
    // Activate whan scrolling
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // You're at the bottom of the page

        // Manga-TX
        try {
            // Click next page button
            document.getElementsByClassName("btn next_page")[0].click();
        } catch {}
        try {
            // Click load more button
            document.getElementsByClassName("btn btn-default load-ajax")[0].click();
        } catch {}

        // Webtoons
        try{
            document.getElementsByClassName("pg_next _nextEpisode NPI=a:next,g:fr_fr")[0].click()
        } catch {}
    }
};
