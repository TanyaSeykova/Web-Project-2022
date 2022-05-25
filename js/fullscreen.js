function getFullScreenElement() {
    return document.fullscreenElement 
        || document.webkitFullscreenElement 
        || document.mozFullscreenElement 
        || document.msFullscreenElement;
}

function toggleFullScreen() {
    
    if (getFullScreenElement()) {
        document.exitFullscreen();
    } else {
        document.getElementById("star-wars").requestFullscreen().catch(console.log());
    }
}

function moveButtons() {
   
    const buttons = document.getElementById("moveable-buttons");
    console.log('hello' + buttons);
    if (!getFullScreenElement()) {
        const outOfFullScreenSection = document.getElementById("buttons");
        outOfFullScreenSection.appendChild(buttons);
    } else {
        const fullScreenSection = document.getElementById("fullscreen-buttons");
        fullScreenSection.appendChild(buttons);
    }
}
(() => {

    const fullScreenButton = document.getElementById("fullscreen_button");
    fullScreenButton.addEventListener("click", toggleFullScreen);

    document.addEventListener("fullscreenchange", moveButtons);

})();