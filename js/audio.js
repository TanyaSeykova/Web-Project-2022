
function handleFiles(event) {
    var files = event.target.files;
    $("#audiosource").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();
}

document.getElementById("audiofile").addEventListener("change", handleFiles, false);

