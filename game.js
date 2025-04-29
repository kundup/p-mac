import { GameMap, map } from "./map.js";
import { Player } from "./player.js";
import { Input } from "./input.js"
import { Graphs } from "./UI.js";
import { EnemyManager } from "./managers/enemymanager.js"

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
            this.dotImage = document.getElementById("dot");
            this.input = new Input();
            this.graphs = new Graphs(this);
            this.enemyManager = new EnemyManager(this);
            this.restart()
                                   
        }
        draw(ctx) {
            this.gameMap.drawMap(ctx);
            this.dot.forEach(obj => {
                ctx.drawImage(this.dotImage, obj.x, obj.y, obj.width, obj.height);
            })
            this.player.draw(ctx);
            this.enemyManager.drawAllEnemy(ctx)                   
    
        }        
        update(deltatime){
            if (this.gamePaused) return;
                        
            this.player.update(deltatime, this.input.keys);
            this.enemyManager.updateAllEnemy()
            this.player.checkCollison()           
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

        rectTile (a, b, buffer){
            return (a.x + buffer< b.x + b.width && a.x + a.width - buffer > b.x &&
                a.y + buffer < b.y + b.height && a.y + a.height - buffer > b.y)
        }
        
        restart (){
            this.enemyManager.resetAllEnemy();
            this.gameOver = false;
            this.map = map.map(row => [...row])
            this.player = new Player(this);             
            this.gameMap = new GameMap(this.map, this);                 
            this.dot = [];
            this.addDotsToList();
            this.enemyManager.spawnEnemy(5);
            this.gamePaused = false;
            this.gameScore = 0;           
        }        
    }
    const game = new Game();
    game.input.handleInput(game);

    let lastTime = 0;
    function animate(timeStamp){
        if (!game.gameOver){
            context.clearRect(0,0,game.width,game.height);
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            game.draw(context);
            game.update(deltaTime);
            requestAnimationFrame(animate);
        }
        else {
            game.graphs.drawGameOver(context);            
        }                
    }
    animate(0);
    window.addEventListener("keydown", function (e) {
        if ((e.key === "r" || e.key === "R") && game.gameOver) {
            game.restart();
            lastTime = 0;
            animate(0);
        }
    });
})


