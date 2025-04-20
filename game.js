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
            this.map = map;
            this.player = new Player(this); 
            this.input = new Input();
            this.gameMap = new GameMap(this.map, this);
            this.dotImage = document.getElementById("dot");
            this.input.handleInput(this);
            this.enemyList = [];
            this.dot = [];
            this.addDotsToList();
            this.addEnemy();
            this.gamePaused = false;
            this.gameScore = 0;
                       
        }
        draw(ctx) {
            this.gameMap.drawMap(ctx);
            this.dot.forEach(obj => {
                ctx.drawImage(this.dotImage, obj.x, obj.y, obj.width, obj.height);
            })
            this.player.draw(ctx);
            this.enemyList.forEach((object) => {
                object.drawEnemies(ctx);                
            });
        }        
        update(deltatime){
            if (this.gamePaused) return;
                        
            this.player.update(deltatime, this.input.keys);
            this.enemyList.forEach((object) =>{
                object.updateEnemies(this.player,this.enemyList);
            }) 
            this.player.checkCollison()           
        }
        addEnemy(){
            for (let i = 0; i < 5; i++) this.enemyList.push(new Enemies(this));            
        }
        addDotsToList (){
            for(let i =0; i < this.row; i++){
                for (let j = 0; j < this.col; j++){
                    if (this.map[i][j] === 2){
                        const dotobj = this.generateObj(j, i, this.tile_size)   
                        this.dot.push(dotobj);
                    }
                }
            }
        }
        generateObj(a,b, tile_size){
            return {
                x : a * tile_size,
                y : b * tile_size,
                width : tile_size,
                height : tile_size
            }
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
