
function handleFiles(event) {
    var files = event.target.files;
    $("#audiosource").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();
}

document.getElementById("audiofile").addEventListener("change", handleFiles, false);



function playAudio() {
    var audiofile = $("#audio")[0];
    audiofile.play();
}

function pauseAudio() {
    var audiofile = $("#audio")[0];
    audiofile.pause();
}
function resetAudio() {
    var audiofile = $("#audio")[0];
    audiofile.currentTime = 0;
}


volume_slider.oninput = function () {
    var audiofile = $("#audio")[0];
    var volume_slider = document.getElementById("volume_slider");
    audiofile.volume = volume_slider.value/10;

    console.log('audiofile volume is ' + audiofile.volume);
    
    console.log('slider value is ' + volume_slider.value);
}





