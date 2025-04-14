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
        this.speed = Math.random() * 2;
        this.enemies = {
            x : this.x,
            y : this.y
        }
    }
    drawEnemies(ctx){
        ctx.drawImage(this.image, this.enemies.x, this.enemies.y, this.width, this.height);
    }
    updateEnemies(player){
        // enemies follows the player
        const dx = player.x - this.enemies.x;
        const dy = player.y - this.enemies.y;

        if (Math.abs(dx) > Math.abs(dy)){
            if (player.x < this.enemies.x){
                this.enemies.x -= this.speed;
            } else if (player.x > this.enemies.x){
                this.enemies.x += this.speed;
            }        }
        else {
            if (player.y < this.enemies.y) this.enemies.y -= this.speed;
            else if (player.y > this.enemies.y) this.enemies.y += this.speed; 
        }            
        if (this.x > this.game.width) this.x = -this.width;
    }
}