const canvas = document.getElementById("pmac");
const graph = canvas.getContext ("2d");
const gameColor = {board : "black",} 

function drawBoard(){
    graph.fillStyle = gameColor.board;
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