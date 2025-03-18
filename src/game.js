const canvas = document.getElementById("pmac");
const graph = canvas.getContext ("2d");

function drawEverything(){
}

function moveEverything(){
}

function gameLoop (){
    drawEverything();
    moveEverything();
    requestAnimationFrame(gameLoop())
}

gameLoop ()