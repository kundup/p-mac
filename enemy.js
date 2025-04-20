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
        this.flickmode = false;
        this.flickduration = 3000;
        this.visible = true;
        this.visibleinterval = 100;

        this.flickertimer = 0;
        this.visibletimer = 0;
    }

    drawEnemies(ctx){
        if (this.visible){ // now flickering with this control
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        };
    }

    updateEnemies(player, allEnemies){ 
        const now = performance.now();  // each updating takes a time here   
        if (this.flickmode) {        
            if (now - this.flickertimer < this.flickduration){            
                if (now - this.visibletimer > this.visibleinterval ){
                    this.visible = !this.visible;
                    this.visibletimer = now; // here we need a time comparing visibleinterval
                }
            }else {
                this.flickmode = false;
                this.visible = true;
            };
        }
                
        else {  
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
            // collision detection enemy ~ player
            this.checkCollisionEnemy(); // here collision only checks after flicker mode turned off.
        }        
        if (this.x > this.game.width) this.x = -this.width;   // independent line from the flicker mode.     
    }  

    checkCollisionEnemy(){
        const buffer = 5;
        if (this.x + this.width - buffer > this.player.x && this.x + buffer < this.player.x + this.player.width && 
            this.y + this.height - buffer > this.player.y && this.y + buffer < this.player.y + this.player.height
        ){    
            this.flickmode = true;
            this.visible = false;
            this.flickertimer = performance.now();// when enemy collides with player saved the time.
            this.visibletimer = performance.now();
        } 
    }    
}
