const nameAnimation = "crawl linear infinite ";
const secondPerPara = 7;
const numberOfParaInCollection = 5;
var itCount = 0;



document.getElementById("play_pause_button").addEventListener("click", play_pause);


var isPlaying = false;

function play_pause() {
    if (fileIsLoaded == true) {
        if (document.getElementById("play_pause_button").innerHTML == "▶️") {
            playAnimation();
            playAudio();
            
            if (pauseStartTime == 0) startTime = new Date();
            if(pauseStartTime != 0 ) pauseEndTime = new Date();    
            console.log("start and end is " + pauseStartTime + " , " + pauseEndTime);   
            pausedTime += pauseEndTime - pauseStartTime;

        } else {
            pauseAnimation();
            pauseAudio();
            pauseStartTime = new Date();
            console.log("start and end is " + pauseStartTime + " , " + pauseEndTime);   
            
        }
    } else {
        window.alert("Файл с данни не е зареден или заредения файл не е в правилния формат.");
    }
}



function playAnimation() {
    isPlaying = true;
    document.getElementById("play_pause_button").innerHTML = "⏸";
    document.getElementById("crawl").style.animation = nameAnimation  + Math.log(100 + numberOfParagraphs) * secondPerPara + "s";
    document.getElementById("crawl").style.animationIterationCount = itCount;
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
var collectionOfParagraphs = [];
var currentCollectionIndex = 0;
function populateWithParagraphs(dataJSON) {
    document.getElementById("titleReports").style.display = "block";
    numberOfParagraphs = 0;
    currentCollectionIndex = 0;
    collectionOfParagraphs = [];

    let currentCollection = [];
    if(dataJSON["reports"] == undefined) {
        window.alert("Форматът на json файлът е неправилен. Проверете примерните файлове, за да видите коректния формат.");
        fileIsLoaded = false;
        return;
    }
    dataJSON["reports"].forEach(element => {
        const para = document.createElement("p");
        const node = document.createTextNode(element["name"]);
        para.appendChild(node);
        para.classList.add("report-p-class");

        currentCollection.push(para);
        numberOfParagraphs++;
        if (numberOfParagraphs % numberOfParaInCollection == 0) {
            collectionOfParagraphs.push(currentCollection);
            currentCollection = [];
        }
    });

    if (numberOfParagraphs % numberOfParaInCollection != 0) {
        collectionOfParagraphs.push(currentCollection);
        currentCollection = [];
    }

    itCount = collectionOfParagraphs.length;
    addCollection();

}

document.getElementById("crawl").addEventListener('animationiteration', addCollection);

function addCollection() {
    currentCollectionIndex++;
    if (currentCollectionIndex <= collectionOfParagraphs.length) {
        if (currentCollectionIndex > 1) {
            document.getElementById("titleReports").style.display = "none";

        }
        removeParagraphs();
        collectionOfParagraphs[currentCollectionIndex - 1].forEach(para => {
            document.getElementById("crawl").appendChild(para);
        });
    }
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
    populateWithParagraphs(dataJSON);
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