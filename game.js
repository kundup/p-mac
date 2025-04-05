
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

class Game{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width = 500;
        this.height = canvas.height = 500;
    }
       
    
}

const game = new Game();

function animate(){
    context.getClear(0,0,game.width,game.height);
    requestAnimationFrame(animate);
}

animate();
