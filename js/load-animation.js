function loadData(animationName) {
    const fd = new FormData();
    fd.append('animationName', animationName);
    const queryAnimationName = encodeURIComponent('animationName') + '=' + encodeURIComponent(animationName);
    fetch('./backend/load-animation/get-animation-data.php?' + queryAnimationName)
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            return data.animationData;
        }
    })
    .then(animationData => {
        loadFiles(animationData);
    });
}
function loadFiles(animationData) {
    const directoryPath = '../save-animation/saved-animations/' + animationData['name']; 
    const configPath = directoryPath + '/' + animationData['configFileName'];
    const dataPath = directoryPath + '/' + animationData['dataFileName'];
    const audioPath = directoryPath + '/' + animationData['audioFileName'];

    loadConfig(configPath);
    loadDataFile(dataPath);
    loadAudioFile(audioPath);
}

function loadConfig(configPath) {
    const queryConfigPath = encodeURIComponent('configPath') + '=' + encodeURIComponent(configPath);
    fetch('./backend/load-animation/get-config-data.php?' + queryConfigPath)
    .then(res => res.json())
    .then(configData => applyConfigData(configData.message)); //вика applyConfigData от animation-styles.js
    
}

function loadDataFile(dataPath) {
    const queryDataPath = encodeURIComponent('dataPath') + '=' + encodeURIComponent(dataPath);
    fetch('./backend/load-animation/get-text-data.php?' + queryDataPath)
    .then(res => res.json())
    .then(data => applyDataChanges(data.message)); //вика applyDataChanges от index.js
}

function loadAudioFile(audioPath) {
    const queryAudioPath = encodeURIComponent('audioPath') + '=' + encodeURIComponent(audioPath);
    fetch('./backend/load-animation/get-audio-file.php?' + queryAudioPath)
    .then(res => res.blob())
    .then(audioBlob => {
        
        const url = URL.createObjectURL(audioBlob);
        const srcAudio = document.getElementById("audiosource");
        srcAudio.src = url;
        document.getElementById('audio').load();
    });
}


(() => {
    const pickerForm = document.getElementById('picker-form');
    pickerForm.addEventListener('submit', (event) => {
        const pickedAnimtaion = document.getElementById('saved-animations');
        if(pickedAnimtaion.childElementCount == 0) {
            document.getElementById("no-animations-error-message").style.display="inline";

        }
        else{
            document.getElementById("no-animations-error-message").style.display="none";

        loadData(pickedAnimtaion.value);
        }
        event.preventDefault();
        
    }); 
})();