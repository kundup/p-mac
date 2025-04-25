export class Graphs {
    constructor(game){        
        this.game = game;
    }

    drawGameOver(ctx){

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, this.game.width, this.game.height);

        ctx.fillStyle = "white";
        ctx.font = "bold 48px serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", this.game.width / 2, this.game.height / 2 - 20);

        ctx.font = "20px sans-serif";
        ctx.fillText("Press R to Restart", this.game.width / 2, this.game.height / 2 + 30);
    }       
    
}