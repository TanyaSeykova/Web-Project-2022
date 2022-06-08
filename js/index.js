const nameAnimation = "crawl linear ";
const secondPerPara = 7;


document.getElementById("play_pause_button").addEventListener("click", play_pause);
var isPlaying = false;
function play_pause() {
    if (fileIsLoaded == true) {
        if (document.getElementById("play_pause_button").innerHTML == "▶️") {
            playAnimation();
            playAudio();
        } else {
            pauseAnimation();
            pauseAudio();
        }
    }
}

function playAnimation() {
    isPlaying = true;
    document.getElementById("play_pause_button").innerHTML = "⏸";
    document.getElementById("crawl").style.animation = nameAnimation + numberOfParagraphs * secondPerPara + "s";
    document.getElementById("crawl").style.animationPlayState = "running";

}

function pauseAnimation() {
    isPlaying = false;
    document.getElementById("play_pause_button").innerHTML = "▶️";
    document.getElementById("crawl").style.animationPlayState = "paused";
}

var fileIsLoaded = false;
var dataJSON = "";
document.getElementById('inputfile').addEventListener('change', function () {

    var fr = new FileReader();
    fr.onload = function () {
        fileIsLoaded = true;
        dataJSON = JSON.parse(fr.result);
        applyDataChanges(dataJSON);
        
    }
    fr.readAsText(this.files[0]);
})

var numberOfParagraphs = 0;
function populateWithParagraphs(dataJSON) {
    dataJSON["reports"].forEach(element => {
        const para = document.createElement("p");
        const node = document.createTextNode(element["name"]);
        para.appendChild(node);
        para.classList.add("report-p-class");
        document.getElementById("crawl").appendChild(para);
        numberOfParagraphs++;
    });
}

function removeParagraphs() {
    const paras = document.querySelectorAll('.report-p-class');

    paras.forEach(para => {
        para.remove();
    });
}
function applyDataChanges(dataJSON) {
    removeParagraphs();
    reset_animation(false);
    populateWithParagraphs(dataJSON);
}
function reset_animation(isReset) {
    var el = document.getElementById('crawl');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = null;
    if (isReset == true) {
        if (document.getElementById("play_pause_button").innerHTML != "▶️") { playAnimation(); }
        else pauseAnimation();
    } else {
        pauseAnimation();
    }
}

document.getElementById("restart_button").addEventListener("click", function () {
    resetAudio();
    reset_animation(true);
});

var xhr = new XMLHttpRequest();
xhr.open("GET", "./json/data.json", true);
xhr.onload = function (e) {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            fileIsLoaded = true;
            dataJSON = JSON.parse(xhr.responseText);
            applyDataChanges(dataJSON);
        } else {
            console.error(xhr.statusText);
        }
    }
};
xhr.onerror = function (e) {
    console.error(xhr.statusText);
};
xhr.send(null);


var crawlContainer, styleCrawlContainer;
window.onload = function () {
    let windowWidth = window.getComputedStyle(document.getElementById("star-wars")).width;
    document.getElementById("star-wars").style.maxWidth = windowWidth;
    document.getElementById("star-wars").style.minWidth = windowWidth;
}