export class Enemies {
    constructor(game){
        this.game = game;
        this.player = this.game.player
        this.x = Math.random() * 200 + this.game.player.x;
        this.y = Math.random() * 200 + this.game.player.y;
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById("enemy");
        this.frameX = 0;
        this.frameY = 0;
        this.speed = Math.random() * 2;
    }

    drawEnemies(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    updateEnemies(player, allEnemies){
        const dx = player.x - this.x;
        const dy = player.y - this.y;

        if (Math.abs(dx) > Math.abs(dy)){
            this.x += Math.sign(dx) * this.speed;
        } else {
            this.y += Math.sign(dy) * this.speed;
        }
        for (let others of allEnemies) {
            if (others === this) continue;

            const ox = this.x - others.x;
            const oy = this.y - others.y;
            const dist = Math.sqrt(ox * ox + oy * oy);
            const minDist = 40;

            if (dist < minDist && dist > 0) {
                this.x += (ox / dist) * (minDist - dist) * 0.1;
                this.y += (oy / dist) * (minDist - dist) * 0.1;
            }
        }
        if (this.x > this.game.width) this.x = -this.width;
        if (this.checkCollisionError()) {
            this.game.gameOver = true;
        }
    }

    checkCollisionError(){
        const buffer = 5;
        return (this.x + this.width - buffer > this.player.x && this.x + buffer < this.player.x + this.player.width && 
            this.y + this.height - buffer > this.player.y && this.y + buffer < this.player.y + this.player.height
        )

    }
}
