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

    const animationData = {
        name: name,
        configData: configData,
    };

    return animationData;
}

function valdateName(animationName) {
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

    if(!valdateName(animationName)) {
        return false;
    }
    if(!validateDataFile(dataFile)) {
        return false;
    }
    if(!validateAudioFile(audioFile)) {
        return false;
    }
    return true;
}

function prepareSaveData(animationData, inputFile, audioFile) {
    const saveData = new FormData();
    saveData.append('animationData', JSON.stringify(animationData));
    saveData.append('inputFile', inputFile);
    saveData.append('audioFile', audioFile);
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