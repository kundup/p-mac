import { GameMap, map } from "./map.js";
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
            this.width = canvas.width = 600;
            this.height = canvas.height = 600;
            this.tile_size = 30;
            this.row = this.height / this.tile_size;
            this.col = this.width / this.tile_size; 

            this.player = new Player(this); 
            this.input = new Input();
            this.gameMap = new GameMap(map, this);
            this.input.handleInput();
            this.enemyList = [];
            this.addEnemy();
                       
        }
        draw(ctx) {
            this.gameMap.drawMap(ctx);
            this.player.draw(ctx);
            this.enemyList.forEach((object) => {
                object.drawEnemies(ctx);                
            });
        }        
        update(deltatime){            
            this.player.update(deltatime, this.input.keys);
            this.enemyList.forEach((object) =>{
                object.updateEnemies(this.player,this.enemyList);
            })            
        }
        addEnemy(){
            for (let i = 0; i < 5; i++) this.enemyList.push(new Enemies(this));            
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
