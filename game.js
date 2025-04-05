
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

class Game{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width = 500;
        this.height = canvas.height = 500;
    }
    draw(ctx){
        ctx.fillRect(this.x+5, this.y+5, this.width/16, this.height/16);
    }
    update(){
        this.x ++;
    }

}

const game = new Game();

function animate(){
    context.clearRect(0,0,game.width,game.height);
    game.draw(context);
    game.update();
    requestAnimationFrame(animate);
}

animate();
