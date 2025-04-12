export class Enemies {
    constructor(game){
        this.game = game
        this.x = Math.random() * 400;
        this.y = Math.random() * 400;
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById("enemy");
        this.frameX = 0;
        this.frameY = 0;
        this.speed = Math.random()* 2;
    }
    drawEnemies(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width * 1.3, this.height * 1.3);
    }
    updateEnemies(){
        this.x += this.speed;
        if (this.x > this.game.width) this.x = 0

    }
}