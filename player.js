export class Player {
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById("player");
        this.frameX = 6;
        this.frameY = 12;
        this.frameMax = 7;
        this.frameInterval = 1000/5;
        this.frameTimer = 0;

        
    }
    draw(contex){
        contex.drawImage(this.image, 15.2 * this.frameX, this.frameY, this.width * 0.5, this.height * 0.5, this.x, this.y, this.width * 1.5, this.height * 1.5);
    }
    update(deltatime){        
        this.x += 1;
        if (this.x >= this.game.width) this.x = 0;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.frameMax)this.frameX ++;
            else this.frameX = 6;
        } else {
            this.frameTimer += deltatime;
        }
        
    }
}