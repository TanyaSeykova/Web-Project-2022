function getAnimtaionSettings() {

    const colorText = document.getElementById("colorText").value;
    const colorBackground = document.getElementById("colorBackground").value;
    const fontName = document.getElementById("fontName").value;
    const fontSize = document.getElementById("fontSize").value;

    const styleData = {
        colorText: colorText,
        colorBackground: colorBackground,
        fontName: fontName,
        fontSize: fontSize,
    }

    return styleData;
}

function getAnimationInfo() {
    const name = document.getElementById("animation-name").value;
    const configData = getAnimtaionSettings();
    const commentsData = getComments();

    const animationData = {
        name: name,
        configData: configData,
        commentsData: commentsData,
    };

    return animationData;
}

function getComments() {
    const comments = document.getElementById("comments-list");
    var commentsData = [];


    console.log("childElCount is " + comments.childElementCount);
    //console.log("hopefully timestamp is " +  comments.children[0].children[2].innerHTML);
    for(var i = 0; i<comments.childElementCount; i++){

        var timestamp = comments.children[i].children[1].innerHTML;
        var commentText = comments.children[i].children[2].innerHTML;

        console.log("timestamp is " + timestamp + " comment: " + commentText );
        
        commentsData.push({
            commentText: commentText, 
            timestamp: timestamp,
        });
    }

    console.log(commentsData);


    return commentsData;
}

function validateName(animationName) {
    if (animationName === "") {
        return false;
    }
    return true;
}
function validateDataFile(dataFile) {
    if(!dataFile) {
        return false;
    }
    if(dataFile['type'] != "application/json") {
        return false;
    }
    return true;
}
function validateAudioFile(audioFile) {
    if(!audioFile) {
        return false;
    }
    const audioString = audioFile['type'].split("/")[0];
    if(audioString != "audio") {
        return false;
    }
    return true;

}
function validateInput(animationName, dataFile, audioFile) {

    if(!validateName(animationName)) {
        window.alert("Не е добавено име на анимацията.");
        return false;
    }
    if(!validateDataFile(dataFile)) {
        window.alert("Не е добавен data.json файл.");
        return false;
    }
    if(!validateAudioFile(audioFile)) {
        window.alert("Не е добавен аудио файл.");
        return false;
    }
    return true;
}

function prepareSaveData(animationData, inputFile, audioFile, commentsData) {
    const saveData = new FormData();
    saveData.append('animationData', JSON.stringify(animationData));
    saveData.append('inputFile', inputFile);
    saveData.append('audioFile', audioFile);
    saveData.append('commentsData', commentsData);
    return saveData;

}
function handleSaveAnimation() {
    const animationData = getAnimationInfo();
    const inputFile = document.getElementById('inputfile').files[0];
    const audioFile = document.getElementById('audiofile').files[0];
    

    if(!validateInput(animationData['name'], inputFile, audioFile)) {
        return;
    }
    const saveData = prepareSaveData(animationData, inputFile, audioFile);
    saveAnimation(saveData);

}
function addNewAnimationToList(animationName) {
    const animationList = document.getElementById('saved-animations');
    let newOption = document.createElement('option');
    newOption.innerText = animationName;
    animationList.appendChild(newOption);
}
function saveAnimation(saveData) {
    return fetch('./backend/save-animation/save-animation.php', {
        method: 'POST',
        body: saveData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            addNewAnimationToList(data.name);
        }
    });
}
(() => {

    const fileForm = document.getElementById("file-form");

    fileForm.addEventListener('submit',  (event) => {
        handleSaveAnimation();
        event.preventDefault();
    });
})();