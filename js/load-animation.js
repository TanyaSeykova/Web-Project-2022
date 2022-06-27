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
    const commentsPath = directoryPath + '/' + animationData['commentsFileName'];

    loadConfig(configPath);
    loadDataFile(dataPath);
    loadAudioFile(audioPath);
    loadCommentsFile(commentsPath);
}

function loadCommentsFile(commentsPath){

    const queryCommentsPath = encodeURIComponent('commentsPath') + '=' + encodeURIComponent(commentsPath);
    fetch('./backend/load-animation/get-comments.php?' + queryCommentsPath)
    .then(res => res.json())
    .then(comments => postComments(comments.message));
}   

function postComments(comments){
    clearComments();

    console.log("comments posted: " + comments);
    for (let i = 0; i < comments.length; i++) {
       console.log(comments[i]["timestamp"] + " : " + comments[i]["commentText"]);
        setTimeout(setComment(comments[i]["commentText"]), comments[i]["timestamp"]);
    }


}

function clearComments(){

    document.getElementById("comments-list").innerHTML = '';
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


function setComment(commentText) {
    var temp = document.getElementById('comment-template');
    var clon = temp.content.cloneNode(true);
  
    var comment = clon.firstElementChild;
    var commentBoxValue = commentText;
  
    //actual comment
    //comment.children[2] is the <p> element with actual comment text
    comment.children[2].innerHTML = commentBoxValue;
    document.getElementById("comments-list").appendChild(clon);
    document.body.appendChild(clon);
  
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