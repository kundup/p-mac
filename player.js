export class Player {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById("player");
        this.frameX = 6;
        this.frameY =12;
        this.frameMax = 7;
        this.frameInterval = 1000/5;
        this.frameTimer = 0;

        
    }
    draw(contex){
        contex.drawImage(this.image, 15.2* this.frameX,this.frameY,15, 15, this.x, this.y, 45, 45);
    }
    update(deltatime){
        
        this.x += 1;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.frameMax)this.frameX ++;
            else this.frameX = 6;
        } else {
            this.frameTimer += deltatime;
        }
        
    }
}