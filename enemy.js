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
        this.speed = Math.random() * 2 + 2;
        this.enemies = [ {
            x : this.x,
            y : this.y
        },]
    }
    drawEnemies(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    updateEnemies(playerx, playery){
        let offset = 20;

        // horizontal movement
        if (playerx > this.x && !this.game.player.speedX == 0 ) this.x += this.speed;
        else if (playerx < this.x && !this.game.player.speedX == 0) this.x -= this.speed;

        if (playery < this.y && !this.game.player.speedY == 0) this.y -= this.speed;
        else if (playery > this.y && !this.game.player.speedY == 0) this.y += this.speed;
                
        if (this.x > this.game.width) this.x = -this.width;
    }
}