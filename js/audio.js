
function handleFiles(event) {
    var files = event.target.files;
    $("#audiosource").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();
}

document.getElementById("audiofile").addEventListener("change", handleFiles, false);


function playAudio(){
    var audiofile = $("#audio")[0];
    audiofile.play();
}

function pauseAudio(){
    var audiofile = $("#audio")[0];
    audiofile.pause();
}



