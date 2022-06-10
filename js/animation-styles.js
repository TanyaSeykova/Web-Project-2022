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

function applyConfigData(configJSON) {
    setStyles(configJSON);
    applyInputChanges(configJSON);
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
        if (checkData(configJSON)) applyConfigData(configJSON);
    }
    fr.readAsText(this.files[0]);
}

function checkData(configJSON) {
    if (configJSON["colorText"] == undefined || configJSON["colorBackground"] == undefined || configJSON["fontName"] == undefined || configJSON["fontSize"] == undefined) {
        window.alert("Избраният конфигурационен файл не е в правилния формат. Можете да видите примерния файл, за да видите правилния формат.");
        return false;
    }
    return true;
}
(() => {

    document.getElementById("configfile").addEventListener("change", readConfigFile);
    document.getElementById("buttonStyles").addEventListener("click", applyStyleFormChanges);
    applyStyleFormChanges();

})();