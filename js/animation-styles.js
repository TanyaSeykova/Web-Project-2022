function setStyles(styleData) {
    document.getElementById("star-wars").style.color = styleData["colorText"];
    document.getElementById("sectionWritings").style.backgroundColor = styleData["colorBackground"];
    document.getElementById("star-wars").style.fontFamily = styleData["fontName"];
    document.getElementById("star-wars").style.fontSize = styleData["fontSize"] + "%";
}

function applyInputChanges(styleData) {

    document.getElementById("colorText").value = styleData["colorText"];
    document.getElementById("colorBackground").value = styleData["colorBackground"];
    document.getElementById("fontName").value = styleData["fontName"];
    document.getElementById("fontSize").value = styleData["fontSize"];
}

function applyStyleFormChanges() {

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

    setStyles(styleData);
}


function readConfigFile() {

    var fr = new FileReader();
    fr.onload = function () {
        const configJSON = JSON.parse(fr.result);
        setStyles(configJSON);
        applyInputChanges(configJSON);
    }
    fr.readAsText(this.files[0]);
}

(() => {

    document.getElementById("configfile").addEventListener("change", readConfigFile);
    document.getElementById("buttonStyles").addEventListener("click", applyStyleFormChanges);
    applyStyleFormChanges();  

})();