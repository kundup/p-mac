export class Enemies {
    constructor(game){
        this.game = game
        this.x = Math.random() * 200 + this.game.player.x
        this.y = Math.random() * 200 + this.game.player.y
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById("enemy");
        this.frameX = 0;
        this.frameY = 0;
        this.speed = Math.random()* 2;
    }
    drawEnemies(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    updateEnemies(){
        if (this.game.player.x){
            this.x += 
        }
        
        if (this.x > this.game.width) this.x = -this.width;
    }
}