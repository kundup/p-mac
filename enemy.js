export class Enemies {
    constructor(){
        this.x = Math.random() * 100 + 100;
        this.y = Math.random() * 100 + 100;
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById("enemy");
        this.frameX = 0;
        this.frameY = 0;
    }
    drawEnemies(ctx){
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    updateEnemies(){
        this.x++;
    }
}