import { Player } from "./player.js";
import { Input } from "./input.js"
import { Enemies } from "./enemy.js";

window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    class Game{
        constructor(){
            this.x = 0;
            this.y = 0;
            this.width = canvas.width = 500;
            this.height = canvas.height = 500;
            this.player = new Player(this); 
            this.input = new Input();
            this.input.handleInput();
            this.enemyList = [];
            this.addEnemy();
                       
        }
        draw(ctx) {
            this.player.draw(ctx);
            this.enemyList.forEach((object) => {
                object.drawEnemies(ctx);
            });
        }
        
        update(deltatime){            
            this.player.update(deltatime, this.input.keys);
            this.enemyList.forEach((object) =>{
                object.updateEnemies();
            })
            
        }

        addEnemy(){
            for (let i = 0; i < 4; i++) this.enemyList.push(new Enemies(this));            
        }
    }

    const game = new Game();

    let lastTime = 0;
    function animate(timeStamp){
        context.clearRect(0,0,game.width,game.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.draw(context);
        game.update(deltaTime);
        requestAnimationFrame(animate);
    }

    animate(0);
})
