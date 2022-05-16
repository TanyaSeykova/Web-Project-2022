
document.getElementById("play_pause_button").addEventListener("click", play_pause);

function play_pause() {
    if (fileIsLoaded == true) {
        if (document.getElementById("play_pause_button").innerHTML == "▶") {
            playAnimation();
        } else {
            pauseAnimation();
        }
    }
}

function playAnimation() {
    document.getElementById("play_pause_button").innerHTML = "⏸";
    document.getElementById("crawl").style.animation = "crawl 60s linear";
    document.getElementById("crawl").style.animationPlayState = "running";
}

function pauseAnimation() {
    document.getElementById("play_pause_button").innerHTML = "▶";
    document.getElementById("crawl").style.animationPlayState = "paused";
}
var fileIsLoaded = false;
var dataJSON = "";
document.getElementById('inputfile').addEventListener('change', function () {

    var fr = new FileReader();
    fr.onload = function () {
        fileIsLoaded = true;
        removeParagraphs();
        reset_animation(false);
        dataJSON = JSON.parse(fr.result);
        populateWithParagraphs();
    }
    fr.readAsText(this.files[0]);
})

function populateWithParagraphs() {
    dataJSON["reports"].forEach(element => {
        const para = document.createElement("p");
        const node = document.createTextNode(element["name"]);
        para.appendChild(node);
        para.classList.add("report-p-class");
        document.getElementById("crawl").appendChild(para);

    });
}

function removeParagraphs() {
    const paras = document.querySelectorAll('.report-p-class');

    paras.forEach(para => {
        para.remove();
    });
}

function reset_animation(isReset) {
    var el = document.getElementById('crawl');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
    if (isReset == true) {
        if (document.getElementById("play_pause_button").innerHTML != "▶") { playAnimation(); }
        else pauseAnimation();
    } else {
        pauseAnimation();
    }
}

document.getElementById("restart_button").addEventListener("click", function () {
    reset_animation(true);
});

document.getElementById("buttonStyles").addEventListener("click", setStyles);

function setStyles() {
    let colorText = document.getElementById("colorText").value;
    let colorBackground = document.getElementById("colorBackground").value;
    let fontName = document.getElementById("fontName").value;
    let fontSize = document.getElementById("fontSize").value;

    document.getElementById("star-wars").style.color = colorText;
    document.getElementById("sectionWritings").style.backgroundColor = colorBackground;
    document.getElementById("star-wars").style.fontName = fontName;
    document.getElementById("star-wars").style.fontSize = fontSize + "%";
}