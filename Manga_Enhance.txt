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
        var previousZoom;
        var readingContent = document.getElementsByClassName("reading-content")[0];
        readingContent.style.zoom = 1;

        while (previousZoom != readingContent.style.zoom){
            previousZoom = readingContent.style.zoom;
            readingContent.style.zoom = (previousZoom * (readingContent.offsetWidth / dezoomValue)); // Dezoom so that te offset width becomes the same for every manga, no matter the initial width
        }
}



function createMenu(){

    // Get previous used zoom
    var defaultZoom = localStorage.getItem("zoom")

    // Dezoom to previous zoom value
    dezoom((100-defaultZoom)*100)

    // The div for the menu
    var menuDiv = document.createElement("div");
    menuDiv.class = "slidecontainer";
    menuDiv.style.position = "fixed";
    menuDiv.style.background = "#353535";
    menuDiv.style.right = "50px";
    menuDiv.style.bottom = 0;
    menuDiv.style.width = "230px";

    // The "Manga Enhance" label
    var logoLabel = document.createElement("span");
    logoLabel.innerHTML = "---- Manga Enhance ----";
    logoLabel.style.fontFamily = "Monospace";
    logoLabel.style.color = "white";
    logoLabel.style.marginLeft = "35px";

    // The "Zoom :" label
    var zoomLabel = document.createElement("span");
    zoomLabel.innerHTML = "Zoom : ";
    zoomLabel.style.fontFamily = "Monospace";
    zoomLabel.style.color = "white";
    zoomLabel.style.paddingLeft = "10px";

    // The slider for the zoom value
    var zoomSlider = document.createElement("input");
    zoomSlider.type = "range";
    zoomSlider.class = "slider";
    zoomSlider.defaultValue = defaultZoom

    // The label for the zoom value
    var showValue = document.createElement("span");
    showValue.style.fontFamily = "Monospace";
    showValue.style.paddingLeft = "10px";
    showValue.style.color = "white";

    document.body.appendChild(menuDiv);
    menuDiv.appendChild(logoLabel);
    menuDiv.appendChild(zoomLabel);
    menuDiv.appendChild(zoomSlider);
    menuDiv.appendChild(showValue);

    showValue.innerHTML = zoomSlider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    zoomSlider.oninput = function() {
        showValue.innerHTML = this.value;
        dezoom((100-this.value)*100);
        localStorage.setItem("zoom", this.value)
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
