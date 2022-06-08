function listAnimations() {
    fetch('./backend/list-animations/list-animations.php')
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            return data.animationNames;
        }
    })
    .then(animationNames => fillAnimationList(animationNames));
}
function fillAnimationList(animationNames) {
    const animationList = document.getElementById('saved-animations');
    console.log(animationNames);
    for (let name of animationNames) {
        let newOption = document.createElement('option');
        newOption.innerText = name['name'];
        animationList.appendChild(newOption);
    }
}
(() => {
    listAnimations();
})();