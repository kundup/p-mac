const canvas = document.getElementById("pmac");
const graph = canvas.getContext ("2d");

function drawBoard(){
    graph.fillStyle = "black";
    graph.fillRect (0, 0, canvas.width, canvas.height);
}

function drawEverything(){
    drawBoard()
}

function moveEverything(){
}

function gameLoop (){
    drawEverything();
    moveEverything();
    requestAnimationFrame(gameLoop());
}

gameLoop ();