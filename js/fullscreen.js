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
    if (!getFullScreenElement()) {
        const outOfFullScreenSection = document.getElementById("buttons");
        outOfFullScreenSection.appendChild(buttons);
        document.getElementById("star-wars").style.fontSize = Number(document.getElementById("star-wars").style.fontSize.slice(0, -1)) / 2 + "%";
        
    } else {
        const fullScreenSection = document.getElementById("fullscreen-buttons");
        fullScreenSection.appendChild(buttons);
        console.log(document.getElementById("star-wars").style.fontSize);
        document.getElementById("star-wars").style.fontSize = Number(document.getElementById("star-wars").style.fontSize.slice(0, -1)) * 2 + "%";
    }
}
(() => {

    const fullScreenButton = document.getElementById("fullscreen_button");
    fullScreenButton.addEventListener("click", toggleFullScreen);

    document.addEventListener("fullscreenchange", moveButtons);

})();