export class Enemies {
    constructor(game, config){
        this.game = game;
        this.config = config;
        this.player = this.game.player;
        this.x = Math.random() * 200 + this.game.player.x;
        this.y = Math.random() * 200 + this.game.player.y;
        this.width = 30;
        this.height = 30;
        this.image = document.getElementById("enemy");
        this.scaredGhost = document.getElementById("scaredGhost2")
        this.frameX = 0;
        this.frameY = 0;
        this.speed = Math.random() * 2;
        this.flickmode = false;
        this.flickduration = 3000;
        this.visible = true;
        this.visibleinterval = 100;
        // time keepers
        this.flickertimer = 0;
        this.visibletimer = 0;
        this.damageable = true;
    }

    drawEnemies(ctx){
        if (this.flickmode){ // now flickering with this control
            if (this.visible === true){
                ctx.drawImage(this.scaredGhost, this.x, this.y, this.width, this.height)
            }
            else return
        }
        else {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
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
                this.damageable = true;
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
        if (this.damageable && this.game.rectTile(this, this.player, 5)
        ){    
            this.flickmode = true;
            this.visible = false;
            this.flickertimer = performance.now();// when enemy collides with player saved the time.
            this.visibletimer = performance.now();
            this.damageable = false;
            this.player.health --;
            if (this.player.health <= 0) this.game.gameOver = true
        } 
    }    
}
