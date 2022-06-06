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
        //сложи фона на бутоните при смаляване
        document.getElementById("moveable-buttons").style.backgroundColor = "#89320D";
        //върни иконката за звука
        document.getElementById("volume_slider_label").style.display = "block";
        //намали текста
        document.getElementById("star-wars").style.fontSize = Number(document.getElementById("star-wars").style.fontSize.slice(0, -1)) / 1.5 + "%";
        
    } else {
        const fullScreenSection = document.getElementById("fullscreen-buttons");
        fullScreenSection.appendChild(buttons);
        //позициониране на бутоните
        fullScreenSection.style.position = "absolute";
        fullScreenSection.style.bottom = "5%";
        //махане на фона на бутоните
        document.getElementById("moveable-buttons").style.backgroundColor = "transparent";
        //махане на иконката за звука
        document.getElementById("volume_slider_label").style.display = "none";
        document.getElementById("star-wars").style.fontSize = Number(document.getElementById("star-wars").style.fontSize.slice(0, -1)) * 1.5 + "%";
        
    }
}

(() => {

    const fullScreenButton = document.getElementById("fullscreen_button");
    fullScreenButton.addEventListener("click", toggleFullScreen);

    document.addEventListener("fullscreenchange", moveButtons);

})();