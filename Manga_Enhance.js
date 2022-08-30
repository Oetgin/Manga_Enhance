// ==UserScript==
// @name         Manga enhance
// @namespace    http://tampermonkey.net/
// @version      1.7.4
// @description  Improves the reading experience of multiple websites
// @author       Oetgin
// @match        https://manga-tx.com/*
// @match        https://www.webtoons.com/*
// @match        https://manga-scantrad.net/*
// @icon         https://github.com/Oetgin/Manga_Enhance/blob/main/Manga_enhance.png?raw=true.png
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    console.log("█▄ ▄█ ▄▀▄ █▄ █ ▄▀  ▄▀▄\n█ ▀ █ █▀█ █ ▀█ ▀▄█ █▀█\n\n██▀ █▄ █ █▄█ ▄▀▄ █▄ █ ▄▀▀ ██▀\n█▄▄ █ ▀█ █ █ █▀█ █ ▀█ ▀▄▄ █▄▄")
    console.log("https://github.com/Oetgin/Manga_Enhance")

    const start_time = window.performance.now()

    // Logger
    class Logger {
        ok(text, spam = false) {
            if (!config.enableLogging) return;
            if (spam && !config.enableSpamLogging) return;
            console.log(`📗 ${text}`);
        }
        warn(text, spam = false) {
            if (!config.enableLogging) return;
            if (spam && !config.enableSpamLogging) return;
            console.log(`📙 ${text}`);
        }
        error(text, spam = false) {
            if (!config.enableLogging) return;
            if (spam && !config.enableSpamLogging) return;
            console.log(`📕 ${text}`);
        }
        action(text, spam = false) {
            if (!config.enableLogging) return;
            if (spam && !config.enableSpamLogging) return;
            console.log(`📘 ${text}`);
        }
        info(text, spam = false) {
            if (!config.enableLogging) return;
            if (spam && !config.enableSpamLogging) return;
            console.log(` ℹ ${text}`);
        }
    }
    const logger = new Logger();



    // Config
    const config = {
        enableLogging: true, //      Log operations in the console
        enableSpamLogging: false, // Log operations that may appear once per tick
    }


    logger.action("Started logging");
    logger.action("Starting Manga Enhance");


    // Constants
    const url = document.location.href;
    const contentArea = document.getElementsByClassName("content-area")[0];



    // Functions
    logger.action("Loading helper functions");

    function dezoom(dezoomValue){
        const readingContent = document.getElementsByClassName("reading-content")[0];
        readingContent.style.zoom = dezoomValue;
    }

    function brighten(brightnessValue){
        const readingContent = document.getElementsByClassName("reading-content")[0];
        readingContent.style.filter = `brightness(${brightnessValue})drop-shadow(0px 0px 10px black)`;
    }

    function scroll(scrollValue){
        window.scrollBy(0,scrollValue);
    }

    function changeCursor(){
        // Cursor
        let Cursor = document.createElement("div");
        Cursor.id = "cursor";
        Cursor.syle.width = "7px";
        Cursor.syle.height = "7px";
        Cursor.syle.backgroundColor = "white";
        Cursor.syle.borderRadius = "50%";
        Cursor.syle.marginBottom = "20rem";

        // Append the elements to the document
        document.body.appendChild(Cursor);

        const moveCursor = (e)=>{
            const mouseY = e.clientY;
            const mouseX = e.clientX;
            Cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        window.addEventListener('mousemove', moveCursor);

    }

    function changeBG(url, blur){
        // Background image
        let BG = document.createElement("div");
        BG.style.backgroundImage = `url('${url}')`;
        BG.style.backgroundSize = "cover";
        BG.style.position = "fixed";
        BG.style.top = "0px";
        BG.style.width = "100%";
        BG.style.height = "100%";
        BG.style.filter = `brightness(0.5)blur(${blur}px)`;

        // Append the elements to the document
        contentArea.prepend(BG);

        try {let Header = document.getElementsByClassName("site-header")[0];
        Header.style.position = "relative";
        Header.style.zIndex = 1;

        document.getElementsByClassName("c-header__top")[0].style.background = "none";
        document.getElementsByClassName("main-navigation style-1 ")[0].style.background = "none";} catch {}

        try {let MangaPresentation = document.getElementsByClassName("profile-manga summary-layout-1")[0];
        MangaPresentation.style.position = "relative";
        MangaPresentation.style.zIndex = 1;
        MangaPresentation.style.background = "none";} catch {}

    }

    function createMenu(){

        let defaultZoom = localStorage.getItem("zoom"); // Get previous used zoom
        let defaultBrightness = localStorage.getItem("brightness"); // Get previous used brightness
        let defaultScroll = localStorage.getItem("autoscroll"); // Get previous used auto-scroll speed

        dezoom(defaultZoom/100+0.1); // Dezoom to previous zoom value
        brighten(defaultBrightness/100); // Set brightness to previous used brightness

        // The div for the menu
        let menuDiv = document.createElement("div");
        menuDiv.class = "slidecontainer";
        menuDiv.style.position = "fixed";
        menuDiv.style.background = "#353535";
        menuDiv.style.right = "50px";
        menuDiv.style.bottom = 0;
        menuDiv.style.width = "280px";
        menuDiv.style.padding = "7.5px";

        // The "Manga Enhance" label
        let logoLabel = document.createElement("span");
        logoLabel.innerHTML = "---- Manga Enhance ----";
        logoLabel.style.fontFamily = "Monospace";
        logoLabel.style.color = "white";
        logoLabel.style.paddingLeft = "42.5px";
        logoLabel.style.paddingRight = "42.5px";

        // The "Zoom :" label
        let zoomLabel = document.createElement("span");
        zoomLabel.innerHTML = "Zoom : ";
        zoomLabel.style.fontFamily = "Monospace";
        zoomLabel.style.color = "white";

        // The slider for the zoom value
        let zoomSlider = document.createElement("input");
        zoomSlider.type = "range";
        zoomSlider.class = "slider";
        zoomSlider.defaultValue = defaultZoom;

        // The label for the zoom value
        let showZoom = document.createElement("span");
        showZoom.style.fontFamily = "Monospace";
        showZoom.style.color = "white";
        showZoom.style.paddingLeft = "10px";
        showZoom.style.display = "inline-block"

        // The "Brightness :" label
        let brightnessLabel = document.createElement("span");
        brightnessLabel.innerHTML = "Brightness : ";
        brightnessLabel.style.fontFamily = "Monospace";
        brightnessLabel.style.color = "white";

        // The slider for the brightness value
        let brightnessSlider = document.createElement("input");
        brightnessSlider.type = "range";
        brightnessSlider.class = "slider";
        brightnessSlider.defaultValue = defaultBrightness;

        // The label for the brightness value
        let showBrightness = document.createElement("span");
        showBrightness.style.fontFamily = "Monospace";
        showBrightness.style.color = "white";
        showBrightness.style.paddingLeft = "10px";

        // The auto-scroll checkbox
        let autoScrollCB = document.createElement("input");
        autoScrollCB.type = "checkbox";

        // The auto-scroll label
        let autoScrollLabel = document.createElement("input");
        autoScrollLabel.innerHTML = "Autoscroll"
        autoScrollLabel.style.fontFamily = "Monospace";
        autoScrollLabel.style.color = "white";

        // The slider for the auto-scroll speed value
        let autoScrollSlider = document.createElement("input");
        autoScrollSlider.type = "range";
        autoScrollSlider.class = "slider";
        autoScrollSlider.defaultValue = defaultScroll;

        // The label for the auto-scroll speed value
        let showAutoScrollSpeed = document.createElement("span");
        showAutoScrollSpeed.style.fontFamily = "Monospace";
        showAutoScrollSpeed.style.color = "white";
        showAutoScrollSpeed.style.paddingLeft = "10px";

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
        showBrightness.innerHTML = brightnessSlider.value; // Display the default brightness slider value

        // Update the current zoom slider value (each time you drag the slider handle)
        zoomSlider.oninput = function() {
            showZoom.innerHTML = this.value;
            dezoom(this.value/100+0.1);
            localStorage.setItem("zoom", this.value);
        }

        // Update the current brightness slider value (each time you drag the slider handle)
        brightnessSlider.oninput = function() {
            showBrightness.innerHTML = this.value;
            brighten(this.value/100);
            localStorage.setItem("brightness", this.value);
        }

        // Update the current auto-scroll speed value (each time you drag the slider handle)
        autoScrollSlider.oninput = function() {
            showAutoScrollSpeed.innerHTML = this.value;
            localStorage.setItem("brightness", this.value);
        }
    }

    function paged(url){
        if (url.match(/(\?style=paged|p\/[0-9]+\/)$/)) {
            return true;
        }
        else {
            return false;
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    logger.ok("Loaded helper functions");



    // Manga-TX and Manga-scantrad code
    if (url.includes("manga-tx") || url.includes("manga-scantrad")) {
        logger.info("Currently on Manga-tx or Manga-scantrad");

        // When reading mangas
        logger.action("Removing banner");
        try {
            // Remove banner
            const elements = document.getElementsByClassName("c-sub-header-nav with-border");
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
            logger.ok("Removed banner");
        } catch {logger.error("Failed to remove banner")}

        logger.action("Removing the gap between images");
        try {
            // Remove gap between images
            const imgs = document.getElementsByClassName("page-break");
            for (let i=0; i<imgs.length; i++){
                imgs[i].children[0].style.margin = 0;
            }
            logger.ok("Removed the gap between images");
        } catch {logger.error("Failed to remove the gap between images")}

        logger.action("Creating menu");
        try {
            // Create menu
            createMenu();
            logger.ok("Created menu");
        } catch {logger.error("Failed to create menu")}

        /*
        logger.action("Changing cursor");
        try {
            // Change cursor
            changeCursor();
            logger.ok("Changed cursor");
        } catch(e) {console.error(e);logger.error("Failed to change cursor")}
*/

        logger.action("Changing background");
        try {
            // Change BG
            changeBG("https://wallpapercave.com/wp/wp6512041.png", 0);
            logger.ok("Changed background");
        } catch {logger.error("Failed to change background")}
        /* BACKGROUNDS :
        Planet : "https://evasion-online.com/images/2016/05/Wallpaper-16.jpg"
        Red : "https://images2.alphacoders.com/107/1076808.jpg"
        Windbreaker : "https://i.pinimg.com/originals/80/60/49/806049a2cffbd27cef72ad89d10f1640.jpg"
        Kimi no na wa : "https://wallpapercave.com/wp/wp5883956.jpg", "https://wallpapercave.com/wp/wp6512036.png", "https://wallpapercave.com/wp/wp6512041.png"
        */

        // When on a manga chapter list page
        logger.action("Activating hover buttons");
        try {
            // Click the "read first" button when mouse hovers over it
            document.getElementById("btn-read-last").addEventListener("mouseover", ()=>{
                document.getElementById("btn-read-last").click();
            })
            logger.ok("Activated hover buttons");
        } catch {logger.warn("Failed to activate hover buttons")}

        // When on paged mode
        if (paged(url)) {
            logger.info("Currently in paged mode");
            logger.action("Opening page in full size");
            try {
                // Click the "View full size image" button
                document.getElementById("btn_view_full_image").click();
                logger.ok("Opened page in full size");
            } catch {logger.error("Failed to open page in full size")}

            logger.action("Scrolling up");
            try {
                logger.info("Sleeping 0.5 sec");
                sleep(500);
                window.scrollTo(0,300);
                logger.ok("Scrolled up");
            } catch {logger.error("Failed to scroll up")}

            logger.action("Activating auto-scroll up when changing pages");
            try {
                document.getElementByClassName("page-link-hover page-next-link")[0].addEventListener("mousedown", ()=>{
                    logger.action("Scrolling up");
                    window.scrollTo(0,300);
                    logger.ok("Scrolled up");
                })
                document.getElementByClassName("page-link-hover page-prev-link")[0].addEventListener("mousedown", ()=>{
                    logger.action("Scrolling up");
                    window.scrollTo(0,300);
                    logger.ok("Scrolled up");
                })
                logger.ok("Activated auto-scroll up when changing pages");
            } catch {logger.error("Failed to activate auto-scroll up when changing pages")}
        }
    }

    // Webtoons code
    if (url.includes("webtoons")){
        logger.info("Currently on Webtoons")
        // Dezoom
        logger.action("Dezooming")
        try{
            document.getElementById("_imageList").style.zoom = 0.7;
            document.getElementById("_imageList").style.width = "1602px";
            logger.ok("Dezoomed");
        } catch {logger.error("Failed to dezoom")}
    }


    const end_time = window.performance.now();
    logger.ok(`Finished start (${end_time - start_time} ms)`);


    window.onscroll = function(ev) {
        logger.info("Scrolling", true)
        // Activate whan scrolling
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            // You're at the bottom of the page
            logger.info("Currently at the bottom of the page", true)

            // Manga-TX and Manga-scantrad
            if (url.includes("manga-tx") || url.includes("manga-scantrad")) {
                logger.action("Clicking next page button")
                try {
                    // Click next page button
                    document.getElementsByClassName("btn next_page")[0].click();
                    logger.ok("Clicked next page button")
                } catch {logger.error("Failed to click next page button")}
                logger.action("Clicking load more button")
                try {
                    // Click load more button
                    document.getElementsByClassName("btn btn-default load-ajax")[0].click();
                    logger.ok("Clicked load more button")
                } catch {logger.error("Failed to click load more button")}
            }

            // Webtoons
            if (url.includes("webtoons")){
                logger.action("Clicking next episode button")
                try{
                    document.getElementsByClassName("pg_next _nextEpisode NPI=a:next,g:fr_fr")[0].click()
                    logger.ok("Clicked next episode button")
                } catch {logger.error("Failed to click next episode button")}
            }
        }
    };
})();
